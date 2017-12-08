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
export default class ForceGraphComponent extends Component {
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
          var link = {source: item.source, target: item.target value: item.value}
          return (<ForceGraphLink key={index} link={link} />);
        })

        return (
            <div id={id}>

                <div style="visibility: hidden; display:inline;">
                ForceGraphComponent: {label} {value}
                </div>

                <InteractiveForceGraph
                    simulationOptions={{ height: 300, width: 600, animate: true }}
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

                          {nodesList}
                          {linksList}

                </InteractiveForceGraph>

            </div>
        );
    }
}

ForceGraphComponent.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * Will return information on selected node
     */
    value: PropTypes.string,

    /**
     * Takes a {'node': {}, 'links': {}} object encoded as a string
     * (not sure why we need to encode this as a string, but
     *  propTypes.Object didn't seem to work)
     */
    graphData: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func
};
