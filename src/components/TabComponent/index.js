import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';

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
    }

    getSimpleTabs(dummyData){
        return dummyData.map(({ name, description }, index) => ({
            key: index,
            title: name,
            getContent: description
        }));
    }
    componentDidMount() {
        fetch("https://gist.githubusercontent.com/jakub-c/95cc4648a34ddd7e52a1b96c45fc6975/raw/98b979e9498e22ce8d6ea523d373911537a92336/weather%2520raw%2520response")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result.list.map(({ name, id }, index) => ({
                            key: index,
                            title: name,
                            getContent:()=> id
                        }))
                    });
                },
                // Note: it's important to handle errors here
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
        console.log('mount it!');

    }

    onChangeProp = propsName =>
        evt => {
            this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
        };


    render() {
        const { showMore, transform, showInkBar, selectedTabKey } = this.state;
        return (
            <div class="box box-danger col-md-9">
                <div class="box-header with-border">
                    <h3 class="box-title">Stage 1</h3>
                </div>
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
                            <button type="button" class="btn btn-sm btn-warning btn-flat pull-left" >Save</button>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-info btn-flat pull-left">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TabComponent;
