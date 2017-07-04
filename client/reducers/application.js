import { 
	GET_GRAPH_DATA_START,
	GRAPH_DATA_ERROR,
	UPDATE_GRAPH_DATA,
	UPDATE_VIEW
} from '../actions';

const initialState = {
	nodes: [],
	links: [],
	error: false,
	loading: true,
	update: false
};

export default function application(state=initialState, action) {

	switch(action.type) {

		case GET_GRAPH_DATA_START:
			return Object.assign({}, state, {
				loading: true,
				error: false
			});

		case UPDATE_GRAPH_DATA:
			return Object.assign({}, state, {
				nodes: action.nodes,
				links: action.links,
				loading: false,
				error: false
			});

		case GRAPH_DATA_ERROR:
			return Object.assign({}, state, {
				error: action.error,
				loading: false
			});

		case UPDATE_VIEW:
			return Object.assign({}, state, {
				update: action.update
			});

		default:
			return state;
	}
}