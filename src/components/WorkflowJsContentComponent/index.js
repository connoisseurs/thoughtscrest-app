import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import Block from "./Components/Block";
import BlockWithPorts from "./Components/BlockWithPorts";
import Stage from "./Components/Stage";
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
        this.populateWorkflow = this.populateWorkflow.bind(this);
        this.updateCoordinates = this.updateCoordinates.bind(this);
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
                  this.populateWorkflow();
                  //this.populateCanvas();
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
      this.canpaper.on('cell:pointerclick', function(e){
        alert(e.el.textContent+' clicked');
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

    populateWorkflow(){
      var x = 5, y = 5, ewidth = 140, offset = 50, pwidth = this.canvas.offsetWidth, pheight = this.canvas.offsetHeight;
      var maxrowcount = Math.floor(pwidth / (ewidth + offset)), rowcount = 0;
      var elements = [];
      var props = {};
      props.pwidth = pwidth;
      props.rowcount = rowcount;
      props.x = x;
      props.y = y;
      props.ewidth = ewidth;
      props.offset = offset;
      props.maxrowcount = maxrowcount;
      props.reverse = false;
      props.dir = "ltr";
      for(var idx in this.state.workflow.stages){
        var sitem = this.state.workflow.stages[idx];
        var stage = getStage(props.x, props.y, sitem.name);
        elements.push(stage);
        this.cangraph.addCell(stage);
        props = this.updateCoordinates(props);
        // rowcount++;
        // x = x + (ewidth + offset);
        // if(rowcount == maxrowcount){
        //   rowcount = 0;
        //   x = 5;
        //   y = y + 100;
        // }
        for(var idy in sitem.blocks){
          var bitem = sitem.blocks[idy];
          var block = getBlockWithPorts(props.x, props.y, bitem.name);
          elements.push(block);
          this.cangraph.addCell(block);
          props = this.updateCoordinates(props);
          // rowcount++;
          // x = x + (ewidth + offset);
          // if(rowcount == maxrowcount){
          //   rowcount = 0;
          //   y = y + 100;
          // }
        }
      }
      for(var idz = 0; idz < elements.length - 1;idz++){
        var link = new joint.dia.Link({
          source: {
            id: elements[idz].id,
            port: 'center'
          },
          target: {
            id: elements[idz + 1].id,
            port: 'center'
          }
        });
        this.cangraph.addCell(link);
      }
    }

    updateCoordinates(props){
      var rowcount = props.rowcount, x = props.x, y = props.y, pwidth = props.pwidth,
      ewidth = props.ewidth, offset = props.offset, maxrowcount = props.maxrowcount;
      var reverse = props.reverse, dir = props.dir;
      rowcount++;
      if(dir === "ltr"){
          x = x + (ewidth + offset);
      }else{
          x = x - (ewidth + offset);
      }

      if(rowcount == maxrowcount){
        rowcount = 0;
        if(dir === "ltr"){
            x = pwidth - 150;
            dir = "rtl";
        }else{
            x = 5;
            dir = "ltr";
        }
        y = y + 100;
      }

      props.rowcount = rowcount;
      props.x = x;
      props.y = y;
      props.ewidth = ewidth;
      props.offset = offset;
      props.maxrowcount = maxrowcount;
      props.reverse = reverse;
      props.dir = dir;
      return props;
    }

    populateCanvas(){
      this.cancells[0] = getBlockWithPorts(20,20,'block 1 newccc');
      this.cancells[0].translate(140, 100);
      this.cancells[1] = this.cancells[0].clone();
      this.cancells[1].translate(300, 60);
      this.cancells[1].attr('.rectlabel/text', 'blok 2 ssfsf');
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

      const polygon = getStage(140, 10, 'my polygon new');
      this.cangraph.addCell(polygon);
    }

    populatePalette() {
      var x = 5, y = 5, ewidth = 140, offset = 10, pwidth = this.canvas.offsetWidth, pheight = this.canvas.offsetHeight;
      var maxrowcount = Math.floor(pwidth / (ewidth + offset)), rowcount = 0;
      var elements = [];
      for(var idx in this.state.workflow.stages){
        var sitem = this.state.workflow.stages[idx];
        for(var idy in sitem.blocks){
          var bitem = sitem.blocks[idy];
          var block = getBlock(x, y, bitem.name);
          elements.push(block);
          this.palgraph.addCell(block);
          rowcount++;
          x = x + (ewidth + offset);
          if(rowcount == maxrowcount){
            rowcount = 0;
            x = 5;
            y = y + 70;
          }
        }
      }

      // var tx = 5, ty = 5, tz = 150; var block = null, idx = 0, item = null;
      // for(var idx in this.state.workflow.stages[0].blocks){
      //   item = this.state.workflow.stages[0].blocks[idx];
      //   block = getBlock(1,1, item.name)
      //   block.translate(tx, ty);
      //   this.palgraph.addCell(block);
      //   tx = tx + tz;
      // }
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
        <div style={{width : "100%"}}>
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
  return Stage({x: posx, y: posy, name: name});
}

function getBlockWithPorts(posx, posy, name){
  return BlockWithPorts({x: posx, y: posy, name: name});
}

function getBlock(posx, posy, name){
  return Block({x: posx, y: posy, name: name});
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
