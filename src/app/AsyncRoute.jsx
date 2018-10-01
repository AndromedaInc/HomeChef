import React, { Component } from 'react';

class AsyncRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
    // need to validate props, want a promise coming in
    this.component = null;
  }

  /* what flow validation would look like if using flow */
  /*
  props: {
    props: mixed,
    loadingPromise: Promize<{ default: Class<React.Component< *, *, * >>}>
  }
  */

  componentDidMount() {
    const { loadingPromise } = this.props;
    // console.log(loadingPromise, this.component);
    loadingPromise.then((module) => {
      // console.log('module is', module);
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    const { props } = this.props;
    const { loaded } = this.state;
    // console.log('Async route is rendering with props: ', props, 'and loadingPromise', this.props.loadingPromise);
    if (loaded) {
      return <this.component {...props} />;
    }
    return <div>Loading...</div>;
  }
}

export default AsyncRoute;
