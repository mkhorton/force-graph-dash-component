import React, {Component} from 'react';
import {MyExampleComponent} from '../src';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div>
                <h1>force-graph Demo</h1>

                <hr/>
                <h2>MyExampleComponent</h2>
                <MyExampleComponent
                    label="This is an example label"
                    value={this.state.value}
                    setProps={newProps => this.setState({value: newProps.value})}
                    graphData='{"nodes": [{"id": "first-node", "label": "First node", "fill": "red"}, {"id": "second-node", "label": "Second node", "fill": "blue"}], "links": [{"source": "first-node", "target": "second-node"}]}'
                />
                <hr/>
            </div>
        );
    }
}

export default Demo;
