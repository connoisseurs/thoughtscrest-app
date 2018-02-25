import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
class KartForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    //  var  nodeList = HTMLFormElement.elements;
    var inputs = document.getElementById("form1").elements;
    var nameArray = [];
    var valueArray = [];


    for (var i = 0, max = inputs.length; i < max; i++) {
      if (inputs[i].name.length > 0) {
        nameArray[i] = (inputs[i].name);
      }

    }
    for (var i = 0, max = nameArray.length; i < max; i++) {
      var temp = nameArray[i];
      valueArray[i] = inputs.namedItem(temp).value;
    }
    var jsonObj = {}
    for (var i = 0; i < nameArray.length; i++) {
      //or check with: if (b.length > i) { assignment }
      jsonObj[nameArray[i]] = valueArray[i]
    }
    console.log(jsonObj);

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //    body: jsonObj,
    //  });

    //console.log(data.get('birthdate'));
  }

  render() {
    return (
      <div class="container">
        <div class="box box-warning col-md-12">
          <ul class="nav nav-tabs" id="tabs">
            <li><a href="#Application" data-toggle="tab">Application</a></li>
            <li><a href="#Assesment" data-toggle="tab">Assesment</a></li>
            <li><a href="#Offer" data-toggle="tab">Offer</a></li>
          </ul>

          <div class="tab-content ">
          <div class="tab-pane active " id="Application">
          <div class = "jumbotron">
          <div class="row">
                      <div class="col-sm-3">

                        <label for="exampleInputName2">Application ID</label>
                      </div>
                      <div class="col-sm-3">
                        <input type="text" class="form-control" id="exampleInputName2" placeholder="LO12345"></input>
                      </div>
                      <div class="col-sm-3">

                        <label for="exampleInputName2">Applicant Name</label>
                      </div>
                      <div class="col-sm-3">
                        <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe"></input>
                      </div>
              </div>

              <div class="tab-content ">
          <div class="tab-pane active " id="Application">
          <div class = "jumbotron">

          </div>


          </div>
          </div>


          
          </div>
          <div class="box box-danger col-md-11">
          <ul class="nav nav-tabs" id="innertabs">
            <li><a href="#Application" data-toggle="tab">Financial Details</a></li>
            <li><a href="#Assesment" data-toggle="tab">Facility Details</a></li>
            <li><a href="#Offer" data-toggle="tab">Contact Details</a></li>
          </ul>
          </div>

          </div>

          </div>


          

        </div>
        </div>

       
           
    );
  }
}
export default KartForm;