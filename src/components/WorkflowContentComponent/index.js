import React, { Component } from 'react';
import TabComponent from "../TabComponent/index";
import SampleBoxComponent from "../SampleBoxComponent";
class WorkflowContentComponent extends Component {

    render() {
        return(
            <div>
                <div id="row">
                    <SampleBoxComponent/>
                </div>
                <div id="row">
                     <TabComponent/>
                </div>
            </div>
        );
    }
}
export default WorkflowContentComponent;