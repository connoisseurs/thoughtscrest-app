import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';

export function BlockWithPorts (props) {
  return new joint.shapes.devs.Model({
    type: 'devs.Model',
    position: {x: props.x, y: props.y},
    attrs: {
      '.rectbody': {
        width: '140',
        height: '60'
      },
      '.rectlabel': {
        text: props.name,
      },
      '.element-node' : {
        'data-color': 'pink'
      }
    }
  });
}

export default BlockWithPorts;
