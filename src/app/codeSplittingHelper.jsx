import React, { Component } from 'react';

export default getImportedComponent => class extends Component {
  constructor(props) {
    super(props);
    this.state = { ImportedComponent: null };
  }

  async componentDidMount() {
    const { default: ImportedComponent } = await getImportedComponent();
    this.setState({ ImportedComponent });
  }

  render() {
    const { ImportedComponent } = this.state;
    return ImportedComponent ? <ImportedComponent {...this.props} /> : null;
  }
};
