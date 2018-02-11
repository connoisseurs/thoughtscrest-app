import React, {PureComponent} from 'react';
import Tabs from 'react-responsive-tabs';
import Form from "react-jsonschema-form";
import * as uiSchema from './uiSchema/uiSchema';
import * as jsonSchema from './jsonSchema/jsonSchema';


import './styles.css';

export class TabComponent extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            showMore: true,
            transform: true,
            showInkBar: true,
            items: [],
            selectedTabKey: 0,
            responseData:{},
            stage_id:0,
            block_id:0

        };
        this.getSimpleTabs = this.getSimpleTabs.bind(this);
        this.getStageContent = this.getStageContent.bind(this);
        this.getDefaultTab = this.getDefaultTab.bind(this);
        this.getBlockContent = this.getBlockContent.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleBlockChange=this.handleBlockChange.bind(this);
        this.handleStageChange=this.handleStageChange.bind(this);

    }

    getJsonSchema() {
        fetch("./dist/Facility Detail/jsonSchema.js")
            .then(res => res.json())
            .then((result) => {
                    return result;
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    handleSubmit(){
        //e.preventDefault();
        var responseJSONObj = this.state.responseData;
        fetch("http://localhost:8090/lead/api/facility", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(responseJSONObj)
        })
        console.log(this.state);
    }

    handleBlockChange(formData){
        console.log("block change");
        console.log(formData);

        this.state.responseData.stageAndBlock[this.state.stage_id].blocks[this.state.block_id].data.fData=formData["formData"];
    }

    handleStageChange(formData){
        console.log("handleStageChange change");
        console.log(formData);

        this.state.responseData.stageAndBlock[this.state.stage_id].stage.data.fData=formData["formData"];
    }

    getDefaultTab(list) {
        return 0;
    }


    getSimpleTabs(blocks) {
        return ({
            showMore: true,
            transform: true,
            showInkBar: true,
            items:  blocks.map(({id, name,data,uiSchema,jsonSchema}, index) => ({
                key: index,
                title: name,
                content: this.getBlockContent(data,index,id)
            })),

            selectedTabKey: 0
        });
    }

    getBlockContent(data,index,id) {
        this.state.block_id=index;
        return (
            <div>
                {<div><Form schema={jsonSchema[id]} uiSchema={uiSchema[id]}  formData={data} onSubmit={this.handleSubmit} onChange={this.handleBlockChange}></Form></div>}
            </div>
        );
    }

    getStageContent(stage,blocks,index) {
        this.state.stage_id=index;
        return (
            <div>
                {stage.data ? (<div><Form children={true} schema={jsonSchema[stage.id]} uiSchema={uiSchema[stage.id]} formData={stage.data} onChange={this.handleStageChange}></Form></div>) : ""}
                <br/>
                {blocks ?
                    (<div className={"box"}>
                        <div className={"box-body basic__tabs nav-tabs-custom"}>
                            <Tabs {...this.getSimpleTabs(blocks)}/>
                        </div>
                    </div>) : ""}
            </div>
        );
    }


    componentDidMount() {
        var initialJson = {
            "workFlowID": "LeadWF_ID",
            "applicationID": ""
        };
        fetch("http://localhost:8090/lead/api/facility", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(initialJson)
        })
            .then(res => res.json())
            .then((res1) => this.state.responseData=res1)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.stageAndBlock.map(({stage, blocks}, index) => ({
                            key: index,
                            title: stage.name,
                            content: this.getStageContent(stage, blocks,index),
                            selectedTabKey:0
                        })),

                    });
                },
                // Note: it'smes important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);

                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


    }

    onChangeProp = propsName =>
        evt => {
            this.setState({[propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value});
        };


    render() {
        const {showMore, transform, showInkBar, selectedTabKey} = this.state;
        return (
            <div class="box box-danger col-md-9">
                    <div class="box-body">
                        <div className="basic__wrapper">
                            <div className="basic__tabs nav-tabs-custom">
                                <Tabs {...this.state} />
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default TabComponent;
