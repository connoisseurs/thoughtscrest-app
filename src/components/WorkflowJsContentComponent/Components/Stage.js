import joint from 'jointjs';

export function Stage (props){
  return new joint.shapes.basic.Rect({
      position: { x: props.x, y: props.y },
      size: { width: 50, height: 60 },
      attrs: {
          path: { d: 'M 50 0 L 0 20 0 80 50 100 100 80 100 20 z', fill: 'pink'},
          text: { text: props.name, fill: 'black' }
      }
  });
}

export default Stage;
