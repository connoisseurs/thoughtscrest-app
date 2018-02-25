import React, {Component} from 'react'

class SampleBoxComponent extends Component {
    render() {
        return (
            <div class="box box-danger col-md-9">
                <div class="box-header with-border">
                    <h3 class="box-title">Stage 1</h3>

                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                                title="" data-original-title="Collapse">
                            <i class="fa fa-minus"></i></button>
                        <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip"
                                title="" data-original-title="Remove">
                            <i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <h3>Hello World!</h3>
                </div>
                <div class="box-footer">
                    Footer
                </div>
            </div>
        );
    }
}
export default SampleBoxComponent;