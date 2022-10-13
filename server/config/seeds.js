const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' },
    { name: 'Clothes' }
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  let user = await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  let user2 = await User.create({
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.com',
      password: 'password12345'
    });

  console.log('Some users seeded');

  await Product.deleteMany();

  
  console.log('products seeded');


  process.exit();
});
