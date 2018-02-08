import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import './joint.core.css';
import './style.css';

export class WorkflowJsContentComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {workflow : {}, isLoaded : false};
        this.cangraph = new joint.dia.Graph();
        this.palgraph = new joint.dia.Graph();
        this.canpaper = null;
        this.palpaper = null;
		    this.cancells=[];
        this.palcells=[];
        this.addCell = this.addCell.bind(this);
        this.populateCanvas = this.populateCanvas.bind(this);
        this.populatePalette = this.populatePalette.bind(this);
    }

    componentDidMount(){
      fetch("./dist/workflow.json")
          .then(res => res.json())
          .then(
              (result) => {
                  console.log(result)
                  this.setState({
                      isLoaded: true,
                      workflow: result
                  });
                  this.populateCanvas();
                  this.populatePalette();
              },
              (error) => {
                  console.log(error);

                  this.setState({
                      isLoaded: true,
                      error
                  });
              }
          )
      this.canvas = ReactDOM.findDOMNode(this.refs.canvasholder);
      this.canpaper = new joint.dia.Paper({
        el: this.canvas,
        width: this.canvas.offsetWidth,
        height: this.canvas.offsetHeight,
        model: this.cangraph,
        gridSize: 20,
        defaultRouter: { name: 'metro' },
        clickThreshold: 1
      });
      this.palette = ReactDOM.findDOMNode(this.refs.paletteholder);
      this.palpaper = new joint.dia.Paper({
        el: this.palette,
        width: this.palette.offsetWidth,
        height: this.palette.offsetHeight,
        model: this.palgraph,
        gridSize: 20,
        clickThreshold: 1
      });
      // var svgZoom = svgPanZoom('#canvas svg', {
      //   center: false,
      //   zoomEnabled: true,
      //   panEnabled: true,
      //   controlIconsEnabled: true,
      //   fit: false,
      //   minZoom: 0.5,
      //   maxZoom:2,
      //   zoomScaleSensitivity: 0.5
      // });
      //
      // (function(){
      //   paper.on('cell:pointerdown', function(){
      //     svgZoom.disablePan();
      //   });
      //   paper.on('cell:pointerup', function(){
      //     svgZoom.enablePan();
      //   });
      // })();
    }

    populateCanvas(){
      this.cancells[0] = getBlockWithPorts(20,20,'block 1 new');
      this.cancells[0].translate(140, 100);
      this.cancells[1] = this.cancells[0].clone();
      this.cancells[1].translate(300, 60);
      this.cancells[1].attr('.rectlabel/text', 'blok 2');
      this.cangraph.addCells(this.cancells);

      var link = new joint.dia.Link({
        source: {
          id: this.cancells[0].id,
          port: 'center'
        },
        target: {
          id: this.cancells[1].id,
          port: 'center'
        }
      });
      this.cangraph.addCells([link]);
      // $('#addCell').on('click', addCell);
      this.canpaper.on('cell:pointerclick', function(e){
        alert(e.el.textContent+' clicked');
      });

      const polygon = getStage(500, 30, 'my polygon new');
      this.cangraph.addCell(polygon);
    }

    populatePalette() {
      var tx = 5, ty = 5, tz = 150; var block = null, idx = 0, item = null;
      for(var idx in this.state.workflow.stages[0].blocks){
        item = this.state.workflow.stages[0].blocks[idx];
        block = getBlock(1,1, item.name)
        block.translate(tx, ty);
        this.palgraph.addCell(block);
        tx = tx + tz;
      }
    }

    addCell() {
      var color = 'pink';
      var number = this.cancells.length;
      this.cancells[number] = this.cancells[0].clone();
      this.cancells[number].translate(-140, -100);
      this.cancells[number].attr('.element-node/data-color', color);
      this.cancells[number].attr('.rectlabel/text', 'blok '+ this.cancells.length);
      this.cangraph.addCells(this.cancells);
    };

    render() {
      return(
        <div>
          <div id="canvas" ref="canvasholder"></div>
          <button id="addCell" onClick={this.addCell}>Add Node</button>
          <button id="save" type="button" class="btn btn-sm btn-info btn-flat pull-right">Save</button>
          <button id="amend" type="button" class="btn btn-sm btn-info btn-flat pull-right">Amend</button>
          <button id="info" type="button" class="btn btn-sm btn-info btn-flat pull-right">Info</button>
          <div id="palette" ref="paletteholder"></div>
        </div>
      );
    }
}

function getStage(posx, posy, name){
  return new joint.shapes.basic.Rhombus({
      position: { x: posx, y: posy },
      size: { width: 100, height: 100 },
      attrs: {
          path: { d: 'M 50 0 L 0 20 0 80 50 100 100 80 100 20 z', fill: 'pink'},
          text: { text: name, fill: 'black' }
      }
  });
}

function getBlockWithPorts(posx, posy, name){
  return new joint.shapes.devs.Model({
    type: 'devs.Model',
    position: {x: posx, y: posy},
    attrs: {
      '.rectbody': {
        width: '140',
        height: '60'
      },
      '.rectlabel': {
        text: name,
      },
      '.element-node' : {
        'data-color': 'pink'
      }
    },
    inPorts: ['center']
  });
}

function getBlock(posx, posy, name){
  return new joint.shapes.devs.Model({
    type: 'devs.Model',
    position: {x: posx, y: posy},
    attrs: {
      '.rectbody': {
        width: '140',
        height: '60'
      },
      '.rectlabel': {
        text: name,
      },
      '.element-node' : {
        'data-color': 'pink'
      }
    }
  });
}

function getStart(posx, posy){
  return new joint.shapes.basic.Ellipse({
      position: { x: 100, y: 130 },
      size: { width: 100, height: 30 },
      attrs: {
          ellipse: { fill: 'green' },
          text: { text: 'start' }
      }
  });
}

function getEnd(){
  return new joint.shapes.basic.Ellipse({
      position: { x: 850, y: 130 },
      size: { width: 100, height: 30 },
      attrs: {
          ellipse: { fill: 'red' },
          text: { text: 'end' }
      }
  });
}

joint.shapes.devs.Model = joint.shapes.devs.Model.extend({
markup: '<g class="element-node">'+
             '<rect class="rectbody" stroke-width="0" rx="5px" ry="5px"></rect>'+
            '<text class="rectlabel" y="0.8em" xml:space="preserve" transform = "translate(70, 10)" font-size="14" text-anchor="middle" font-family="Arial, helvetica, sans-serif">'+
              '<tspan id="v-18" dy="0em" x="0" class="v-line"></tspan>'+
            '</text>'+
          '<g class="inPorts"/>' +
          '<g class="outPorts"/>' +
        '</g>',
portMarkup: '<g class="port"><circle class="port-body"/></g>'
});

export default WorkflowJsContentComponent;
