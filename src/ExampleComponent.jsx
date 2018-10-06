import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ApolloClient from 'apollo-boost';
// import { gql } from 'graphql-tag';
// import { ApolloProvider } from 'react-apollo';
// import { graphql } from 'react-apollo';
// import graphql from 'graphql';
import schema from '../graphQL/schema';

// const client = new ApolloClient({
//   uri: 'http://localhost:5678/graphql'
// });
// <ApolloProvider client={client}></ApolloProvider>

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chefId: 1,
      chef: [],
    };
  }

  componentDidMount() {
    this.getChef();
  }

  getChef() {
    // const { chefId } = this.state;
    // const query = `{
    //   chef(id: ${chefId}) {
    //     id,
    //     name,
    //     username,
    //   }
    // }`;
    // graphql(schema.ChefType, query)
    //   .then((result) => {
    //     console.log(result);
    //     this.setState({ chef: result });
    //   })
    //   .catch(err => console.log(err));
  }

  // getChef() {
  //   const { chefId } = this.state;
  //   client
  //     .query({
  //       query: gql`
  //       {
  //         chef(id: ${chefId}) {
  //           id,
  //           name,
  //           username,
  //         }
  //       }
  //     `
  //     })
  //     .then(result => this.setState({ chef: result }))
  //     .catch(err => console.log(err));
  //   client.query();
  // }

  render() {
    const { chef } = this.state;
    return (
      <div>
        { chef }
      </div>
    );
  }
}

export default ExampleComponent;
