import React, {Component} from 'react';

export class RuleEditorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title_options:[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' },
            ],
            box_content:{"one":{"Package 1":{"Rule 1":{},"Rule 2":{},"Rule 3":{}},"Package 2":{"Rule 1":{},"Rule 2":{},"Rule 3":{}}},"two":{"Package 3":{"Rule 1":{},"Rule 2":{},"Rule 3":{}},"Package 4":{"Rule 1":{},"Rule 2":{},"Rule 3":{}}}},
            footer_content:{},
            selectValue: { value: 'one', label: 'One' },
            selectedPackage:"",
            mediaId:null
        }
        this.getBoxTitle = this.getBoxTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectOnChange=this.handleSelectOnChange.bind(this);
        this.handlePackageClick=this.handlePackageClick.bind(this);

    }


    handleSelectOnChange(newValue){
        this.setState({
            selectValue: newValue,
        });
    }



    getBoxTitle(){
    }



    handleSubmit(){

    }

    handlePackageClick(key){
        this.setState({selectedPackage:key});
        console.log(key);
    }

    render() {
        return(
            <div class="row">
                <div class="col-xs-11">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Package1 > Rule 1</h3>
                        </div>
                        <div class="box-body table-responsive no-padding" style={{minHeight:300}}>
                            <table class="table table-hover">
                                <tbody><tr>
                                    <th>if</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td><label>(</label></td>
                                    <td>
                                        <select class="form-control" width={"50%"}>
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td><label>)</label></td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <div class="input-group-btn-xs">
                                                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action
                                                    <span class="fa fa-caret-down"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#">Add Below</a></li>
                                                    <li><a href="#">Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>(</label></td>
                                    <td>
                                        <select class="form-control" width={"50%"}>
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td><label>)</label></td>
                                    <td>
                                        <select class="form-control">
                                            <option>option 1</option>
                                            <option>option 2</option>
                                            <option>option 3</option>
                                            <option>option 4</option>
                                            <option>option 5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <div class="input-group-btn-xs">
                                                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action
                                                    <span class="fa fa-caret-down"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#">Add Below</a></li>
                                                    <li><a href="#">Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="col-xs-1">
                                    <label>&nbsp;&nbsp;&nbsp;then</label>
                                </div>
                                <div class="col-xs-4">
                                    <div class="input-group">
                                        <span class="input-group-addon"><label>Points</label></span>
                                            <input type="text" class="form-control"/>
                                        <span class="input-group-addon">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer clearfix no-border">
                            <button type="button" class="btn-sm btn-danger pull-right"><i class="fa fa-check-square"></i> Validate </button>
                            <button type="button" class="btn-sm btn-default pull-right"><i class="fa fa-plus"></i> Save </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default RuleEditorComponent;

