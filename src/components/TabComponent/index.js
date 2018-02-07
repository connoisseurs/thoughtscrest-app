import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';
import renderHTML from 'react-render-html';
import Form from "react-jsonschema-form";

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
        };
        this.getSimpleTabs = this.getSimpleTabs.bind(this);
        this.getStageContent = this.getStageContent.bind(this);
    }



    getSimpleTabs(sub_nav){
        return ({
                    showMore: true,
                    transform: true,
                    showInkBar: true,
                    items:sub_nav.map(({name,form_content,html_content,sub_nav},index) => ({
                        key: index,
                        title: name,
                        content: this.getStageContent(form_content,html_content,sub_nav)

                    })),
                    selectedTabKey: 0
        });
    }
    getStageContent(form_content,html_content,sub_nav){
        return(
             <div>
              {html_content? renderHTML(html_content) : ""}
              {form_content? ( <div><Form schema={form_content.jsonSchema} formData={form_content.formData}/></div> ) : ""}
              <br/>
              {sub_nav ?
              (<div className={"box"}>
              <div className={"box-body basic__tabs nav-tabs-custom"}>
              <Tabs {...this.getSimpleTabs(sub_nav)}/>
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
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result.map(({ name,form_content,html_content,sub_nav}, index) => ({
                            key: index,
                            title: name,
                            content: this.getStageContent(form_content,html_content,sub_nav)

                        }))
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
            this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
        };


    render() {
        const { showMore, transform, showInkBar, selectedTabKey } = this.state;
        return (
            <div class="box box-danger col-md-9">
               <form id="form" onSubmit={this.handleSubmit}>
               <div class="box-body">
                    <div className="basic__wrapper">
                        <div className="basic__tabs nav-tabs-custom">
                            <Tabs {...this.state} />
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="margin">
                        <div class="btn-group">
                            <button type="submit" class="btn btn-sm btn-warning btn-flat pull-left" >Save</button>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-info btn-flat pull-left">Next</button>
                        </div>
                    </div>
                </div>
               </form>
            </div>
        );
    }
}

export default TabComponent;
