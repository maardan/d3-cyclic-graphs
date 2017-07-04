import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import './App.scss';
import Graph from '../components/Graph';

class App extends Component {

	componentDidMount() {
		this.props.actions.getGraphData();
	}

	render() {
		const status = this.props.loading ? <div id="loader"></div> : <h3>Try hovering over a node or clicking on an edge</h3>;
		return (
			<div id='appContainer'>
				{status}
				<div>
					<Graph/>
				</div>
			</div>);
	}
}

//Redux Setup
function mapStateToProps(state) {
	return {
		loading: state.application.loading
	}
}
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);