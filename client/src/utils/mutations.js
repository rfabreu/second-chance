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
        ownedBy
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
    $file: Upload!
    $name: String!
    $description: String!
    $quantity: Int!
    $price: Float!
    $ownedBy: ID!
    $category: GraphQLCategory!
  ) {
    addProduct(
      name: $name
      description: $description
      file: $file
      quantity: $quantity
      price: $price
      ownedBy: $ownedBy
      category: $category
    ) {
      _id
    }
  }
`;
