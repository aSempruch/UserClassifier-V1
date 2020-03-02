import React, { Component } from 'react';
import { Circle } from 'react-konva';

import { BALLSIZE, BASKETSIZE } from './constants';

export default class Basket extends Component {

	state = {
		inBasket: false
	}
	
	checkBasket(param) {
		const { x, y } = param.target.attrs;
		const { basketPos } = this.props;

		if(overlaps(x, y, basketPos)){			
			this.setState({
				inBasket: true
			})
		}
	}
	
  render() {
		
		const { inBasket } = this.state;

		if(!inBasket) {
			return (
				// TODO: Change hard coded starting pos
				<Circle
					x = {window.innerWidth/2-200}
					y = {window.innerHeight/2}
					width={BALLSIZE}
					height={BALLSIZE}
					fill="green"
					draggable
					onDragEnd={this.checkBasket.bind(this)}
				/>
			);
		}
		else {
			return null;
		}
	}
}

const overlaps = (x, y, bp) => {
	return (
		(Math.abs(bp.x-x) < BASKETSIZE/2 - BALLSIZE/2 + 1) && // 1 added for extra tolerance
		(Math.abs(bp.y-y) < BASKETSIZE/2 - BALLSIZE/2 + 1)
	);
}