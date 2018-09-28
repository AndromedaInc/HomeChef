import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = pathToModule => {
  console.log('pathToModule is', pathToModule);
  console.log('import is', import(pathToModule));
  return Loadable({
    loader: () => import(/* webpackChunkName: "dashboardChunk" */ pathToModule),
    loading: () => <div>Loading...</div>,
  })
}

export default LoadableComponent