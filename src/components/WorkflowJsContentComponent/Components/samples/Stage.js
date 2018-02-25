import joint from 'jointjs';

export function Stage (props){
  return new joint.shapes.basic.Path({
      position: { x: props.x, y: props.y },
      size: { width: props.w, height: props.h },
      attrs: {
          //path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
          path: { d: 'M 50 0 L 0 20 0 80 50 100 100 80 100 20 z'},
          text: {
              text: props.t,
              'ref': 'path',
              'ref-x': .5,
              //'ref-y': props.y - props.h
               'ref-dy': props.y - 155
              //'ref-y': .5 // basic.Path text is originally positioned under the element
          }
      }
  });
}

export default Stage;
