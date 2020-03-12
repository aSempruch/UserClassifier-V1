import React, { Component } from 'react';
import { Group, Circle, Text } from 'react-konva';

import { BALLSIZE, BASKETSIZE, ACT_ENUM, BALL_ENUM } from '../constants';

export default class Basket extends Component {

	state = {
		inBasket: false,
		touched: false
	}
	
	checkBasket(e) {
		const { x, y } = e.target.attrs;
		const { basketPos } = this.props;

		if(overlaps(x, y, basketPos)){			
			this.setState({
				inBasket: true
			})
			this.props.handleBallEvent(BALL_ENUM.PLACED_IN_BASKET);
			this.props.setActionState(ACT_ENUM.ROUND_END);
		}
	}

	dragStart(e) {
		this.props.handleBallEvent((this.state.touched) ? (BALL_ENUM.PICKED_UP) : (BALL_ENUM.INITIAL_PICKED_UP));
		this.props.mouseActivityHandler(e);
		this.setState({touched: true});
	}
	
  render() {
		
		const { inBasket } = this.state;
		const { ballPos, num } = this.props;
		
		if(!inBasket) {
			return (
				// TODO: Change hard coded starting pos
				<Group
					x = {ballPos.x}
					y = {ballPos.y}
					draggable
					onDragEnd={(e) => { this.props.mouseActivityHandler(e); this.props.handleBallEvent(BALL_ENUM.PUT_DOWN); this.checkBasket(e) }}
					onDragStart={this.dragStart.bind(this)}
					onDragMove={this.props.mouseActivityHandler}
				>
					<Circle
						width={BALLSIZE}
						height={BALLSIZE}
						fill="green"
						shadowEnabled
						shadowBlur={3}
						shadowOffset={{x: 2, y: 2}}
					/>
				</Group>
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