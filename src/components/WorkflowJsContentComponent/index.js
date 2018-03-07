import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import {Modal, Button, OverlayTrigger, Popover, Tooltip, Table } from 'react-bootstrap';
import Block from "./Components/Block";
import BlockWithPorts from "./Components/BlockWithPorts";
import Stage from "./Components/Stage";
import './joint.core.css';
import './style.css';
import $ from 'jquery';


export class WorkflowJsContentComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          workflow : {},
          isLoaded : false,
          canModalIsOpen: false,
          palModalIsOpen: false,
          currentCanElement: {el : {}},
          selectedCanElement: {properties: {}},
          currentPalElement: {el : {}},
          selectedPalElement: {properties: {}},
        };
        this.cangraph = new joint.dia.Graph();
        this.palgraph = new joint.dia.Graph();
        this.canpaper = null;
        this.palpaper = null;
		    this.cancells=[];
        this.palcells=[];
        this.addCell = this.addCell.bind(this);

        this.populateWorkflow = this.populateWorkflow.bind(this);
        this.updateCoordinates = this.updateCoordinates.bind(this);
        this.populatePalette = this.populatePalette.bind(this);
        this.validateMagnet = this.validateMagnet.bind(this);
        this.validateConnection = this.validateConnection.bind(this);
        this.checkIfElementExistsInGraph = this.checkIfElementExistsInGraph.bind(this);
        this.removeFromGraph = this.removeFromGraph.bind(this);
        this.saveGraph = this.saveGraph.bind(this);

        this.addStart = this.addStart.bind(this);
        this.addStages = this.addStages.bind(this);
        this.addBlocks = this.addBlocks.bind(this);
        this.addLinks = this.addLinks.bind(this);
        this.addEnd = this.addEnd.bind(this);
        this.addLink = this.addLink.bind(this);
        this.updateLink = this.updateLink.bind(this);

        this.openCanModal = this.openCanModal.bind(this);
        this.closeCanModal = this.closeCanModal.bind(this);
        this.openPalModal = this.openPalModal.bind(this);
        this.closePalModal = this.closePalModal.bind(this);
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
       joint.setTheme("material");
      this.canvas = ReactDOM.findDOMNode(this.refs.canvasholder);
      this.canpaper = new joint.dia.Paper({
        el: this.canvas,
        width: this.canvas.offsetWidth,
        height: this.canvas.offsetHeight,
        model: this.cangraph,
        gridSize: 5,
        defaultRouter: { name: 'orthogonal' },
        clickThreshold: 1,
        drawGrid:true,
        perpendicularLinks:true,
        padding:10,
        validateMagnet: function(cellView, magnet) {
          return this.validateMagnet(cellView, magnet);
        }.bind(this),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
          return this.validateConnection(cellViewS, magnetS, cellViewT, magnetT, end, linkView);
        }.bind(this)
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
      this.canpaper.on('cell:pointerclick', function(cell){
        this.openCanModal(cell);
      }.bind(this));
        this.palpaper.on('cell:pointerclick', function(cell){
        this.openPalModal(cell);
      }.bind(this));

        this.palpaper.on('cell:pointerdown', function(cellView, e, x, y) {
        if(!this.checkIfElementExistsInGraph(cellView)){
          $('body').append('<div id="flyPaper" ref="flypaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
          var flyGraph = new joint.dia.Graph,
            flyPaper = new joint.dia.Paper({
              el: $('#flyPaper'),
              model: flyGraph,
              interactive: false
            }),
            flyShape = cellView.model.clone(),
            pos = cellView.model.position(),
            offset = {
              x: x - pos.x,
              y: y - pos.y
            };

          flyShape.position(0, 0);
          flyGraph.addCell(flyShape);
          $("#flyPaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
          });
          $('body').on('mousemove.fly', function(e) {
            $("#flyPaper").offset({
              left: e.pageX - offset.x,
              top: e.pageY - offset.y
            });
          }.bind(this));
          $('body').on('mouseup.fly', function(e) {
            console.log("element : " + e)
            console.log("el from paper : " + this.canpaper)
            var x = e.pageX,
              y = e.pageY,
              target = this.canpaper.$el.offset();

            // Dropped over paper ?
            if (x > target.left && x < target.left + this.canpaper.$el.width() && y > target.top && y < target.top + this.canpaper.$el.height()) {
              var s = flyShape.clone();
              s.position(x - target.left - offset.x, y - target.top - offset.y);
              this.cangraph.addCell(s);
              this.updateLink(s);
            }
            $('body').off('mousemove.fly').off('mouseup.fly');
            flyShape.remove();
            $('#flyPaper').remove();
          }.bind(this));
        }
      }.bind(this));
        this.canpaper.$el.on('mousewheel DOMMouseScroll', function onMouseWheel(e) {
            //function onMouseWheel(e){
            e.preventDefault();
            e = e.originalEvent;
            console.log(e);
            var delta = Math.max(-4, Math.min(4, (e.wheelDelta || -e.detail))) / 50;
            var offsetX = (e.offsetX || e.clientX - $(this).offset().left);

            var offsetY = (e.offsetY || e.clientY - $(this).offset().top);
            var svgPoint = this.canpaper.svg.createSVGPoint();
                svgPoint.x = offsetX;
                svgPoint.y = offsetY;
                var p = svgPoint.matrixTransform(this.canpaper.viewport.getCTM().inverse());

            var newScale = joint.V(this.canpaper.viewport).scale().sx + delta;
            console.log(' delta' + delta + ' ' + 'offsetX' + offsetX + 'offsety--' + offsetY + 'p' + p.x + 'newScale' + newScale)
            if (newScale > 0.4 && newScale < 2) {
                this.canpaper.setOrigin(0, 0);
                this.canpaper.scale(newScale, newScale, p.x, p.y);
            }

        }.bind(this));

    }

    validateMagnet(cellView, magnet) {
      // Prevent links from ports that already have a link
      //var port = magnet.getAttribute('port');
      var links = this.cangraph.getConnectedLinks(cellView.model);
      //alert(links.length);
      if(links.length <= 1){
        return true;
      }else{
        return false;
      }
      // Note that this is the default behaviour. Just showing it here for reference.
      // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
      //return magnet.getAttribute('magnet') !== 'passive';
    }

    validateConnection(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
      var links = this.cangraph.getConnectedLinks(cellViewT.model);
      //alert(links.length + " " + magnetS.getAttribute('port-group') + " " + cellViewT.model.isLink());
      //do not allow linking starting from an inport
      // if(magnetS.parentElement.parentElement.className.baseVal == 'inPorts'){
      //   return false;
      // }
      // do not allow link target to be another link
      if(cellViewT.model.isLink()){
        return false;
      }
      if(links.length <= 1){
        return true;
      }else{
        return false;
      }
    }

    checkIfElementExistsInGraph(cell){
      var element = cell.model;
      var type = element.attributes['wetype'];
      var id = element.attributes['weid'];
      var name = element.attributes['wename'];
      var gjson = this.cangraph.toJSON();
      for(var idx in gjson.cells){
        var gelement = gjson.cells[idx];
        if((gelement['wetype'] && gelement['wetype'] == type)
          //&& (gelement['weid'] && gelement['weid'] == id)
          && (gelement['wename'] && gelement['wename'] == name)){
          return false;
        }
      }
      return false;
    }

    openCanModal(cell) {
      if(cell.model.isElement() && cell.model.attributes['wetype'] === 'block'){
        this.setState({canModalIsOpen: true, currentCanElement: cell});
        this.setState({selectedCanElement: cell.model.attributes['witem']});
        // alert(cell.model.isElement());
        // alert(cell.model.attributes['wetype']);
        //this.findBlock(cell.model);
        //this.setState({selectedCanElement: this.state.workflow.stages[0].blocks[1]});
      }
      console.log(JSON.stringify(this.cangraph.toJSON()));
    }

    openPalModal(cell){
      this.setState({palModalIsOpen: true, currentPalElement: cell});
      this.setState({selectedPalElement: cell.model.attributes['witem']});
    }

    findBlock(model){
      var name = model.attributes['wename'];
      var item = model.attributes['witem'];
      for(var idx in this.state.workflow.stages){
        var stage = this.state.workflow.stages[idx];
        for(var idy in stage.blocks){
          var block = stage.blocks[idy];
          if(name == block.name){
            this.setState({selectedCanElement: block});
            break;
          }
        }
      }
    }

    closeCanModal() {
      this.setState({canModalIsOpen: false});
    }

    closePalModal() {
      this.setState({palModalIsOpen: false});
    }

    removeFromGraph(){
      var nghs = this.cangraph.getNeighbors(this.state.currentCanElement.model);
      this.state.currentCanElement.model.remove();
      this.addLink(nghs[0], nghs[1]);
    }

    populateWorkflow(){
      var x = 4, y = 4, ewidth = 150, offset = 50, pwidth =this.canvas.offsetWidth, pheight = this.canvas.offsetHeight;
      var maxrowcount = 4, rowcount = 0;
      var elements = [];
      var props = {};

      props.pwidth = pwidth;
      props.rowcount = rowcount;
      props.x = x;
      props.y = y;
      props.ewidth = ewidth;
      props.offset = offset;
      props.maxrowcount = 4;
      props.reverse = true;
      props.dir = "ltr";

      this.addStart(props, elements);
      this.addStages(props, elements);
      this.addEnd(props, elements);
      this.addLinks(elements);

      this.setState({elements : elements});
    }

    addStart(props, elements){
      var start = getStart(props.x, props.y);
      elements.push(start);
      this.cangraph.addCell(start);
      props = this.updateCoordinates(props);
    }

    addStages(props, elements){
      for(var idx in this.state.workflow.stages){
        var sitem = this.state.workflow.stages[idx];
        var stage = getStage(props.x, props.y, sitem.name, sitem);
        elements.push(stage);
        this.cangraph.addCell(stage);
        props = this.updateCoordinates(props);
        this.addBlocks(sitem, elements, props);
      }
    }

    addBlocks(stage, elements, props){
      for(var idy in stage.blocks){
        var bitem = stage.blocks[idy];
        var block = getBlockWithPorts(props.x, props.y, bitem.name, bitem);
        elements.push(block);
        this.cangraph.addCell(block);
        props = this.updateCoordinates(props);
      }
    }

    addEnd(props, elements){
      var end = getEnd(props.x, props.y);
      elements.push(end);
      this.cangraph.addCell(end);
      props = this.updateCoordinates(props);
    }

    addLinks(elements){
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

    updateLink(newElement){
      var end = this.state.elements[this.state.elements.length - 1];
      var endNgh = this.cangraph.getNeighbors(end)[0];
      var link = this.cangraph.getConnectedLinks(endNgh, {outbound : true})[0];
      link.remove();
      this.addLink(endNgh, newElement);
      this.addLink(newElement, end);
    }

    addLink(source, target){
      var link = new joint.dia.Link({
        source: {
          id: source.id,
          port: 'center'
        },
        target: {
          id: target.id,
          port: 'center'
        }
      });
      this.cangraph.addCell(link);
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

    populatePalette() {
      var x = 5, y = 5, ewidth = 140, offset = 10, pwidth =this.palette.offsetWidth, pheight = this.palette.offsetHeight;
      var maxrowcount = 1, rowcount = 0;
      var elements = [];
      for(var idx in this.state.workflow.stages){
        var sitem = this.state.workflow.stages[idx];
        for(var idy in sitem.blocks){
          var bitem = sitem.blocks[idy];
          var block = getBlockWithPorts(x, y, bitem.name, bitem);
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
      var bitem = sitem.blocks[idy];
      var block = getBlockWithPorts(x, y, "extra block from palette", {id: '122', name: 'extra block from palette' , description: '', properties: {}});
      elements.push(block);
      this.palgraph.addCell(block);
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

    saveGraph(){
      var gjson = this.cangraph.toJSON();
      var workflow = {}, stages = [];
      alert(gjson);
      workflow['stages'] = stages;
      // use graph.getLinks() -  get all Links
      // iterate the Links
      // for each link get the source and target id
      // using the source and target id get their elements
      // check if the source is a 'stage'
      // create a source element in json with the 'witem'
      // iterate the links till the next source id is a 'stage'
      // for each child of source create a block element in json using 'witem'
      for(var idx in gjson.cells){
        var gelement = gjson.cells[idx];
        if((gelement['wetype'] && gelement['wetype'] == 'stage')){
          if(gelement.blocks){
            gelement.blocks = [];
          }
          stages.push(gelement);
        }
      }
    }

    render() {
      return(

        <div >
            <div>
                {/* <button id="addCell" onClick={this.addCell}>Add Node</button> */}
                <button id="save" onClick={this.saveGraph} type="button" class="btn btn-sm btn-info btn-flat">Save</button>
                <button id="amend" type="button" class="btn btn-sm btn-info btn-flat">Amend</button>
                <button id="info" type="button" class="btn btn-sm btn-info btn-flat">Info</button>
            </div>

            <div className={"row"}>
                <div id="palette" className={"col-md-3"} ref="paletteholder">

                </div>
                    <div id="canvas" className={"col-md-9"} ref="canvasholder">

                    </div>
            <Modal show={this.state.canModalIsOpen} onHide={this.closeCanModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>{this.state.selectedCanElement.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {/* <div className="container-fluid col-md-12"> */}
                      <div className="row">
                          <div className="col-md-6">
                              <textarea value={this.state.selectedCanElement.description}></textarea>
                          </div>
                          <div className="col-md-6">
                              <Table responsive striped bordered condensed hover>
                                  <thead>
                                  <tr>
                                      <th>Property</th>
                                      <th>Value</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      Object.keys(this.state.selectedCanElement.properties).map(function(key, idx) {
                                          return (<tr>
                                              <td>{key}</td>
                                              <td>{this.state.selectedCanElement.properties[key]}</td>
                                          </tr>)
                                      }.bind(this))
                                  }
                                  </tbody>
                              </Table>
                          </div>
                      </div>
                      {/* </div> */}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={this.removeFromGraph}>Remove from workflow</Button>
                      <Button onClick={this.closeCanModal}>Close</Button>
                  </Modal.Footer>
              </Modal>
              <Modal show={this.state.palModalIsOpen} onHide={this.closePalModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>{this.state.selectedPalElement.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {/* <div className="container-fluid col-md-12"> */}
                      <div className="row">
                          <div className="col-md-6">
                              <textarea value={this.state.selectedPalElement.description}></textarea>
                              <input type="text" class="form-control" value={this.state.selectedPalElement.description} placeholder="Enter ..."/>
                          </div>
                          <div className="col-md-6">
                              <Table responsive striped bordered condensed hover>
                                  <thead>
                                  <tr>
                                      <td>Property</td>
                                      <td>Value</td>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      Object.keys(this.state.selectedPalElement.properties).map(function(key, idx) {
                                          return (<tr>
                                              <td><input type="text" value={key}></input></td>
                                              <td><input type="text" value={this.state.selectedPalElement.properties[key]}></input></td>
                                          </tr>)
                                      }.bind(this))
                                  }
                                  </tbody>
                              </Table>
                          </div>
                      </div>
                      {/* </div> */}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={this.closePalModal}>Close</Button>
                  </Modal.Footer>
              </Modal>
          </div>

        </div>
        );
    }
}

function getStage(posx, posy, name, item){
  var istage = Stage({x: posx, y: posy, name: name});
  istage.prop('wetype', 'stage');
  istage.prop('weid', '');
  istage.prop('wename', name);
  istage.prop('witem', item);
  return istage;
}

function getBlockWithPorts(posx, posy, name, item){
  var iblock = BlockWithPorts({x: posx, y: posy, name: name, id: ''});
  iblock.prop('wetype', 'block');
  iblock.prop('weid', '');
  iblock.prop('wename', name);
  iblock.prop('witem', item);
  return iblock;
}

function getBlock(posx, posy, name, item){
  return Block({x: posx, y: posy, name: name, id: ''});
}

function getStart(posx, posy){
  return new joint.shapes.basic.Ellipse({
      position: { x: posx, y: posy },
      size: { width: 70, height: 40 },
      attrs: {
          ellipse: { fill: 'green' },
          text: { text: 'start' }
      }
  });
}

function getEnd(posx, posy){
  return new joint.shapes.basic.Ellipse({
      position: { x: posx, y: posy },
      size: { width: 70, height: 40 },
      attrs: {
          ellipse: { fill: 'red' },
          text: { text: 'end' }
      }
  });
}

var decode_entities = (function() {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    "nbsp": " ",
    "amp" : "&",
    "quot": "\"",
    "lt"  : "<",
    "gt"  : ">"
  };
  return function(s) {
    return ( s.replace(translate_re, function(match, entity) {
      return translate[entity];
    }) );
  }
})();

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
