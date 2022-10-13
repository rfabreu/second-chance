const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const fs = require('fs')
const { finished } = require('stream/promises')

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          id: '_id',
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },

    getProduct: async (parent, { name }) => {
      return await Product.findOne({ name })
    }
  },
  Mutation: {
    addUser: async (parent, args) => {

      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addProduct: async (parent, args, context) => {
      if (context.user) {

        const { createReadStream, filename } = await args.file;
 
              // Invoking the `createReadStream` will return a Readable Stream.
              // See https://nodejs.org/api/stream.html#stream_readable_streams
              const stream = createReadStream();

              // This is purely for demonstration purposes and will overwrite the
              // file in photos with the filename specified here in the current working directory (server directory) on EACH upload.
              const out = fs.createWriteStream(`./photos/${filename}`);
              stream.pipe(out);
              await finished(out);

              //after writing the file to disk, create a base64 string representation of the picture
              const filebase64str = fs.readFileSync(
                  `./photos/${filename}`,
                  {
                      encoding: "base64",
                  }
              );

              const fileExtension = filename
                  .split(/\./g) //split string on the dot
                  .find((item) => /jpg|jpeg|png/g.test(item)); //find the item in the array that matches the regex pattern

        delete args.file
        const product = await Product.create({ ...args, image: `data:image/${fileExtension};base64, ` +
        filebase64str, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products: product._id } },
          { new: true }
        );
          fs.unlinkSync(`./photos/${filename}`)
        return product;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addOrder: async (parent, { products }, context) => {
     
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
