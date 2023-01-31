import ReadData from './readdata';
import React from 'react';

function ReactLazyPreload (importStatement) {
  const Component = React.lazy(importStatement);
  Component.preload = importStatement;
  return Component;
}; 

export default function Preload()
{
  ReadData();
  const Component = ReactLazyPreload(() => import('./Home'));
        Component.preload();
}