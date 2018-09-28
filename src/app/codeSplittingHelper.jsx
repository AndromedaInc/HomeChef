import React from 'react';
import Loadable from 'react-loadable';

export default pathToModule => {
  return Loadable({
    loader: () => import(pathToModule),
    loading: () => <div>Loading...</div>,
  })
}