import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return <div>Hello, World!</div>;
//   }
// }

// export default App;

const routeOptions = routes.map(({path, component, exact}) => {
  return (<Route key={`${Math.random()}ROUTE_`} path={path} exact={exact} component={component}/>)
})

export default () => <Switch>{routeOptions}</Switch>