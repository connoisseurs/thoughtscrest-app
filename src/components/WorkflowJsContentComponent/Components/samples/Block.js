import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';

export function Block (props) {
  return new joint.shapes.basic.Rect({
      position: { x: props.x, y: props.y },
      size: { width: props.w, height: props.w },
      attrs: {
          rect: { fill: 'white' },
          text: { text: props.t, fill: 'black' }
      }
  });
}

export default Block;
