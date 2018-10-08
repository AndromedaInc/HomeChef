import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';

// const client = new ApolloClient();
// NOTE: ApolloClient and ApolloProvider tags can go in index.js around the whole app

const GET_CHEFS = gql`
  {
    chefs {
      id,
      name,
      username,
      description,
      password,
    }
  }
`;

const ExampleComponent = () => (
// <ApolloProvider client={client}>
  <Query
    query={GET_CHEFS}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error ${error.message}`;
      if (data) console.log(data);

      return (
        <div>
          {data.chefs.map((chef) => {
            return (
              <div key={chef.id}>
                {`Name: ${chef.name}`}
                {`Username: ${chef.username}`}
                {`Description: ${chef.description}`}
              </div>
            );
          })}
        </div>
      );
    }}
  </Query>
// </ApolloProvider>
);

export default ExampleComponent;
