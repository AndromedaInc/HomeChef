import React, { Component } from 'react';

class AsyncRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
    this.component = null;
  }

  componentDidMount() {
    const { loadingPromise } = this.props;
    loadingPromise.then((module) => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    const { props } = this.props;
    const { loaded } = this.state;
    if (loaded) {
      return <this.component {...props} />;
    }
    return <div>Loading...</div>;
  }
}

export default AsyncRoute;
