import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import Block from "./Components/Block";
import Stage from "./Components/Stage";

export class WorkflowJsContentComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.graph = new joint.dia.Graph();
		    this.cells=[];
    }

    componentDidMount(){
      const paper = new joint.dia.Paper({
      			el: ReactDOM.findDOMNode(this.refs.placeholder),
      			width: 1000,
      			height: 500,
      			model: this.graph,
      			gridSize: 1,
            defaultLink: new joint.dia.Link({
                markup: [
                    '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
                   // '<path class="marker-source" fill="none" stroke="none" d="0 0 0 0"/>',
                     '<path class="marker-target" fill="black" stroke="black" d="M 10 0 L 0 5 L 10 10 z"/>',
                    '<path class="connection-wrap" d="M 0 0 0 0"/>',
                    '<g class="marker-vertices"/>',
                    //'<g class="marker-arrowheads"/>'
                ].join(''),
            }),
            defaultConnector: {
                name: 'smooth'
            }
      		});
      const rect = new joint.shapes.basic.Rect({
          position: { x: 100, y: 30 },
          size: { width: 100, height: 30 },
          attrs: {
              rect: { fill: 'blue' },
              text: { text: 'my box', fill: 'white' }
          }
      });
      this.graph.addCell(rect);

      const rect2 = rect.clone();
      rect2.translate(300);
      this.graph.addCell(rect2);

      paper.getDefaultLink().set({
          source: { id: rect.id },
          target: { id: rect2.id },
      }).addTo(this.graph);

      const polygon = new joint.shapes.basic.Polygon({
          position: { x: 500, y: 30 },
          size: { width: 100, height: 30 },
          attrs: {
              polygon: { fill: 'blue', stroke: 'black' },
              text: { text: 'my polygon', fill: 'white' }
          }
      });
      this.graph.addCell(polygon);

      const start = new joint.shapes.basic.Ellipse({
          position: { x: 100, y: 130 },
          size: { width: 100, height: 30 },
          attrs: {
              ellipse: { fill: 'green' },
              text: { text: 'start' }
          }
      });
      this.graph.addCell(start);

      var stage =  new Stage({
          x: 250, y: 100, w: 100, h: 100, t: 'Stage 1'
      });
      this.graph.addCell(stage);

      const block1 = Block({x: 450, y: 100, w: 100, h: 30, t: 'block from object'});
      this.graph.addCell(block1);

      const block2 = new joint.shapes.basic.Rect({
          position: { x: 650, y: 130 },
          size: { width: 100, height: 30 },
          attrs: {
              rect: { fill: 'white' },
              text: { text: 'Block 2', fill: 'black' }
          }
      });
      this.graph.addCell(block2);

      const end = new joint.shapes.basic.Ellipse({
          position: { x: 850, y: 130 },
          size: { width: 100, height: 30 },
          attrs: {
              ellipse: { fill: 'red' },
              text: { text: 'end' }
          }
      });
      this.graph.addCell(end);

      paper.getDefaultLink().set({
          source: { id: start.id },
          target: { id: stage.id },
      }).addTo(this.graph);

      paper.getDefaultLink().set({
          source: { id: stage.id },
          target: { id: block1.id },
      }).addTo(this.graph);

      paper.getDefaultLink().set({
          source: { id: block1.id },
          target: { id: block2.id },
      }).addTo(this.graph);

      paper.getDefaultLink().set({
          source: { id: block2.id },
          target: { id: end.id },
      }).addTo(this.graph);

    }

    render() {
      return(
        <div>
          <div ref="placeholder">Hello workflow!!!</div>
          <hr style={{"color" : "black"}}></hr>
          <div ref="palette">Hello workflow!!!</div>
        </div>
      );
    }
}

export default WorkflowJsContentComponent;
