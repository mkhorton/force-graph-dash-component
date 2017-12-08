import React from 'react';
import {shallow} from 'enzyme';
import MyExampleComponent from '../ForceGraphComponent.react';

describe('ForceGraphComponent', () => {

    it('renders', () => {
        const component = shallow(<MyExampleComponent label="Test label"
        graphData='{"nodes": [{"id": "first-node", "label": "First node", "fill": "red"}, {"id": "second-node", "label": "Second node", "fill": "blue"}], "links": [{"source": "first-node", "target": "second-node"}]}'
        />);
        expect(component).to.be.ok;
    });
});
