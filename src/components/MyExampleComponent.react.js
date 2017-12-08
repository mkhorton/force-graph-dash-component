import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class MyExampleComponent extends Component {
    render() {
        const {id, label, setProps, value, graphData = '{"nodes":[], "links":[]}'} = this.props;

        var graphDataParsed = JSON.parse(graphData)

        var nodesList = graphDataParsed.nodes.map(function(item, index){
          //return <div key={index}>{item.id} {item.label} {item.fill}</div>
          var node = {id: item.id, label: item.label}
          return (<ForceGraphNode key={index} node={node} fill={item.fill} />);
        })

        var linksList = graphDataParsed.links.map(function(item, index){
          //return <div key={index}>{item.id} {item.label} {item.fill}</div>
          var link = {source: item.source, target: item.target}
          return (<ForceGraphLink key={index} link={link} />);
        })

        return (
            <div id={id}>
                MyExampleComponent: {label}
                <input
                    value={value}
                    onChange={e => {
                        /*
                         * Send the new value to the parent component.
                         * In a Dash app, this will send the data back to the
                         * Python Dash app server.
                         */
                         if (setProps) {
                             setProps({
                                value: e.target.value
                            });
                         }
                    }}
                />

                <InteractiveForceGraph
                    simulationOptions={{ height: 300, width: 300, animate: true }}
                    labelAttr="label"
                    highlightDependencies
                    onSelectNode={(event, node) => {
                        /*
                         * Send the new value to the parent component.
                         * In a Dash app, this will send the data back to the
                         * Python Dash app server.
                         */
                         if (setProps) {
                             setProps({
                                value: node
                            });
                         }
                    }}
                    >

                          <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
                          <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
                          <ForceGraphNode node={{ id: 'third-node', label: 'Second node' }} fill="blue" />
                          <ForceGraphNode node={{ id: 'fourth-node', label: 'Second node' }} fill="blue" />
                          <ForceGraphNode node={{ id: 'fifth-node', label: 'Second node' }} fill="blue" />
                          <ForceGraphNode node={{ id: 'sixth-node', label: 'Second node' }} fill="blue" />

                          <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
                          <ForceGraphLink link={{ source: 'second-node', target: 'third-node' }} />
                          <ForceGraphLink link={{ source: 'third-node', target: 'first-node' }} />
                          <ForceGraphLink link={{ source: 'fourth-node', target: 'first-node' }} />
                          <ForceGraphLink link={{ source: 'fourth-node', target: 'second-node' }} />
                          <ForceGraphLink link={{ source: 'fourth-node', target: 'sixth-node' }} />
                          <ForceGraphLink link={{ source: 'fifth-node', target: 'first-node' }} />
                          <ForceGraphLink link={{ source: 'fifth-node', target: 'sixth-node' }} />

                          {nodesList}
                          {linksList}

                </InteractiveForceGraph>

            </div>
        );
    }
}

MyExampleComponent.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input
     */
    value: PropTypes.string,

    graphData: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func
};
