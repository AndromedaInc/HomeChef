import React from 'react';
import loadable from 'loadable-components';

const Loading = () => <div>Loading...</div>;

const LoadableHelper = function (pathToModule) {
  console.log(pathToModule);
  return loadable(() => import(pathToModule), {
    LoadingComponent: Loading,
  });
}

export default LoadableHelper