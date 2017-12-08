import force_graph
import dash
import dash_html_components as html

import json

app = dash.Dash('')

app.scripts.config.serve_locally = True

app.layout = html.Div([
    force_graph.ForceGraphComponent(
        id='input',
        value='my-value',
        label='my-label',
        graphData=json.dumps({
            'nodes': [
                { 'id': 'custom-node-1', 'label': 'First node', 'fill': 'green' },
                { 'id': 'custom-node-2', 'label': 'Second node', 'fill': 'green' }
            ],
            'links': [
                { 'source': 'custom-node-1', 'target': 'custom-node-2' }
            ]
        })
    ),
    html.Div(id='output')
])

@app.callback(
	dash.dependencies.Output('output', 'children'),
	[dash.dependencies.Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)

if __name__ == '__main__':
    app.run_server(debug=True)
