import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';

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
      			width: 600,
      			height: 200,
      			model: this.graph,
      			gridSize: 1
      		});
      const rect = new joint.shapes.basic.Rect({
          position: { x: 100, y: 30 },
          size: { width: 100, height: 30 },
          attrs: {
              rect: { fill: 'blue' },
              text: { text: 'my box', fill: 'white' }
          }
      });

      const rect2 = rect.clone();
      rect2.translate(300);

      const link = new joint.dia.Link({
          source: { id: rect.id },
          target: { id: rect2.id },
          attrs: {}
      });
      link.attr({
          '.connection': { stroke: 'blue' },
          '.marker-source': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
          '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
      });

      this.graph.addCells([rect, rect2, link]);
      // this.graph.addCells(this.cells);
    }

    render() {
      return(
          <div ref="placeholder">Hello workflow!!!</div>
      );
    }
}

export default WorkflowJsContentComponent;
