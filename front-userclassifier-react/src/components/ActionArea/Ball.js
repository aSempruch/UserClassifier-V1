import React, { Component } from 'react';
import { Circle } from 'react-konva';

import { BALLSIZE, BASKETSIZE, ACT_ENUM } from '../constants';

export default class Basket extends Component {

	state = {
		inBasket: false
	}
	
	checkBasket(e) {
		const { x, y } = e.target.attrs;
		const { basketPos } = this.props;

		if(overlaps(x, y, basketPos)){			
			this.setState({
				inBasket: true
			})
			this.props.setActionState(ACT_ENUM.ROUND_END);
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
					onDragEnd={(e) => { this.props.mouseActivityHandler(e); this.checkBasket(e) }}
					onDragStart={(e) => { this.props.setActionState(ACT_ENUM.PLAY); this.props.mouseActivityHandler(e) }}
					onDragMove={this.props.mouseActivityHandler}
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