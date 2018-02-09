import joint from 'jointjs';

export function Stage (props){
  return new joint.shapes.basic.Rhombus({
      position: { x: props.x, y: props.y },
      size: { width: 140, height: 90 },
      attrs: {
          path: { d: 'M 50 0 L 0 20 0 80 50 100 100 80 100 20 z', fill: 'pink'},
          text: { text: props.name, fill: 'black' }
      }
  });
}

export default Stage;
