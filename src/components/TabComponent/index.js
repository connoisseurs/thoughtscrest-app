import React, {PureComponent} from 'react';
import Tabs from 'react-responsive-tabs';
import Form from "react-jsonschema-form";
import uiSchema from './uiSchema/uiSchema'
import jsonSchema from './jsonSchema/jsonSchema'


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
            block:{},
            stage:{}
        };
        this.getSimpleTabs = this.getSimpleTabs.bind(this);
        this.getStageContent = this.getStageContent.bind(this);
        this.getDefaultTab = this.getDefaultTab.bind(this);
        this.getBlockContent = this.getBlockContent.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleBlockChange=this.handleBlockChange.bind(this);
        this.handleStageChange=this.handleBlockChange.bind(this);

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
        console.log(this.state);
    }

    handleBlockChange(formData){
        console.log("block change");
        this.state.block=formData;
    }

    handleStageChange(formData){
        console.log("handleStageChange change");
        this.state.stage=formData;
    }

    getDefaultTab(list) {
        return 0;
    }


    getSimpleTabs(blocks) {
        return ({
            showMore: true,
            transform: true,
            showInkBar: true,
            items:  blocks.map(({id, name,data,UI_Schema,jsonSchema}, index) => ({
                key: index,
                title: name,
                content: this.getBlockContent(data,UI_Schema,jsonSchema)
            })),

            selectedTabKey: 0
        });
    }

    getBlockContent(data) {
        return (
            <div>
                {<div><Form schema={jsonSchema} uiSchema={uiSchema}  formData={data} onSubmit={this.handleSubmit} onChange={this.handleBlockChange}></Form></div>}
            </div>
        );
    }

    getStageContent(stage, blocks) {
        return (
            <div>
                {stage.data ? (<div><Form children={true} schema={jsonSchema} uiSchema={uiSchema} formData={stage.data} onChange={this.handleStageChange}></Form></div>) : ""}
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
        fetch("./dist/dummyData.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.stageAndBlock.map(({stage, blocks}, index) => ({
                            key: index,
                            title: stage.name,
                            content: this.getStageContent(stage, blocks),
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
