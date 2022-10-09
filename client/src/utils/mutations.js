import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        myItem
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $image: String!
    $quantity: Int!
    $price: Float!
    $myItem: String!
    $category: GraphQLCategory!
  ) {
    addProduct(
      name: $name
      description: $description
      image: $image
      quantity: $quantity
      price: $price
      myItem: $myItem
      category: $category
    ) {
      _id
    }
  }
`;
