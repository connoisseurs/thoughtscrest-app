import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import RuleEditorComponent from "./RuleEditorComponent";

export class RuleComponent extends Component {

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
        return <Select onChange={this.handleSelectOnChange} options={this.state.title_options} autoload={false} value={this.state.selectValue} searchable={false} clearable={false}/>
    }



    handleSubmit(){

    }



    handlePackageClick(key){
        this.setState({selectedPackage:key});
        console.log(key);
    }

    render() {
        var selectedVal=this.state.selectValue.value;
        var temp_object=this.state.box_content[selectedVal];
        var box_content=[];
        var keys = Object.keys(temp_object);
        this.state.selectedPackage=keys[0];
        return(
            <div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="box box-solid">
                            <div class="box-header with-border">
                                <h3 class="box-title">{this.getBoxTitle()}</h3>
                            </div>
                            <div class="box-body">
                                <div class="box-group" id="accordion">
                                    {keys.map((key,index)=>{
                                        var packages=temp_object;
                                        var rules=packages[key];
                                        var rules_keys=Object.keys(rules);
                                        return (
                                            <div class="panel box box-primary">
                                                <div class="box-header with-border">
                                                    <h4 class="box-title">
                                                        <a data-toggle="collapse"  data-parent="#accordion" onClick={()=>this.handlePackageClick(key)} href={"#collapse"+selectedVal+index} aria-expanded="false" class="collapsed">
                                                            {key}
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div id={"collapse"+selectedVal+index} class="panel-collapse collapse" aria-expanded="false" height="0px" >
                                                    <div class="box-body" >
                                                        {rules_keys.map(item => <div class="checkbox"><label><input type="checkbox"  id={item} value={item}/> {item}</label></div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                </div>
                            </div>
                            <div class="box-footer clearfix no-border">
                                <button type="button" class="btn-sm btn-danger pull-right"><i class="fa fa-trash"></i> Delete </button>
                                <button type="button" class="btn-sm btn-primary pull-right"><i class="fa fa-edit"></i> Amend </button>
                                <button type="button" class="btn-sm btn-default pull-right"><i class="fa fa-plus"></i> Add </button>
                            </div>
                    </div>
                </div>
                </div>
                <RuleEditorComponent {...this.state}></RuleEditorComponent>
            </div>
            );

    }
}
export default RuleComponent;

