import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import './Graph.scss';

const width = 960;
const height = 600;
var force = d3.layout.force().charge(-3000).linkDistance(50).size([width, height]);
let initPgLoad = false;

class Graph extends Component {

	constructor(props) {
		super(props);
		this.state = { show: '' };
	}

	componentWillMount() {
		initPgLoad = true;
		force.on('tick', () => { this.forceUpdate(); }); // after force calculation starts, call forceUpdate on the React component on each tick
	}

	componentWillReceiveProps(nextProps) {
		if (initPgLoad) {
			let n = nextProps.nodes.slice(0); 
			let l = nextProps.links.slice(0);
			force.nodes(n).links(l).start(); // D3's force function mutates the nodes and links array directly so we should clone the nodes and links
		}
	}

	setHighlight(i) {
		this.setState({ show: i });
	}

	// this logic increments the selected edge ("total" number) then updates the graph data
	handleEdgeClick(i) {
		initPgLoad = false;
		let new_links = this.props.links;
		new_links[i].total+=100;
		this.props.actions.updateGraphData(this.props.nodes, new_links);
		this.props.actions.updateView(this.props.update);
	}

	render() {
	    // use React to draw all the nodes, d3 calculates the x and y
	    const nodes = this.props.nodes.map((node, i) => {
	    	return (
	    		<g className='node' key={i} transform={'translate(' + node.x + ',' + node.y + ')'}>
		    		<circle 
		    			r={20} 
		    			style={{ fill: (i === this.state.show ? 'green' : '#659ed9') }} 
		    			onMouseEnter={() => this.setHighlight(i)} 
		    			onMouseLeave={() => this.setState({ show: '' })} 
	    			/>
		    		<text x={10} dy='.35em'>{node.key}</text>
	    		</g>);
	    });
	    
	    const links = this.props.links.map((link, i) => {
	    	return (
				<g className='link' key={i}>
					<line 
						style={{ stroke: (this.state.show === link.source.index ? 'green' : '#659ed9') }} 
						strokeWidth={link.total/20} 
						onClick={() => this.handleEdgeClick(i)}
						x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y}
					/>
					{this.state.show === link.source.index ? <text x={((link.source.x+link.target.x)/2)} y={((link.source.y+link.target.y)/2)}>{link.total}</text> : ''}	
				</g>);
	    });

	    const currView = this.props.error ? <h1>{this.props.error}</h1> : <svg width={width} height={height}><g>{links}{nodes}</g></svg>

		return (currView);
	}
}

//Redux Setup
function mapStateToProps(state) {
	return {
		nodes: state.application.nodes,
		links: state.application.links,
		update: state.application.update,
		error: state.application.error
	}
}
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);