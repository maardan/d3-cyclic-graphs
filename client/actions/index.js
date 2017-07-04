import api from '../api';

export const GET_GRAPH_DATA_START = 'GET_GRAPH_DATA_START';
export const GRAPH_DATA_ERROR = 'GRAPH_DATA_ERROR';
export const UPDATE_GRAPH_DATA = 'UPDATE_GRAPH_DATA';
export const UPDATE_VIEW = 'UPDATE_VIEW';

function getGraphDataStart() {
	return {
		type: GET_GRAPH_DATA_START
	};
}

function getGraphDataError(error) {
	return {
		type: GRAPH_DATA_ERROR,
		error
	};
}

export function updateGraphData(nodes, links) {
	return {
		type: UPDATE_GRAPH_DATA,
		nodes,
		links
	};
}

export function getGraphData() {

	return function (dispatch) {

		dispatch(getGraphDataStart());

		api.getGraphData().then(graph_data => {

			// from API result, construct data that's understandable by the current d3 library, ex: {nodes: [], links: []}
			var node_obj = graph_data.nodes,
				links = [],
				nodes = [],
				indx = 0;

			for (var i in node_obj) {
				node_obj[i].index = indx++;
				nodes.push({ key: node_obj[i].title })
			}

			graph_data.edges.map(function(obj, i) {
				links[i] = { "source": node_obj[obj.source].index, "target": node_obj[obj.destination].index, total: obj.total };
			});

			dispatch(updateGraphData(nodes, links));

		}).catch(error => dispatch(getGraphDataError(error)));
	};
}

export function updateView(arg) {
	let boool = arg ? false : true;
	return {
		type: UPDATE_VIEW,
		update: boool
	};
}