import React, { Component } from 'react';
import { Group, Circle, Text } from 'react-konva';

import { BALLSIZE, BASKETSIZE, BASKET_POS, ACT_ENUM, BALL_ENUM } from '../constants';

export default class Basket extends Component {

	state = {
		inBasket: false,
		touched: false
	}
	
	checkBasket(e) {
		const { x, y } = e.target.attrs;

		if(overlaps(x, y)){			
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
		
		return (
			// TODO: Change hard coded starting pos
			<Group
				x = {ballPos.x}
				y = {ballPos.y}
				draggable={true}
				onDragEnd={(e) => { this.props.mouseActivityHandler(e); this.props.handleBallEvent(BALL_ENUM.PUT_DOWN); this.checkBasket(e) }}
				onDragStart={this.dragStart.bind(this)}
				onDragMove={this.props.mouseActivityHandler}
				visible={!inBasket}
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
}

const overlaps = (x, y) => {
	return (
		(Math.abs(BASKET_POS.x-x) < BASKETSIZE/2 - BALLSIZE/2 + 1) && // 1 added for extra tolerance
		(Math.abs(BASKET_POS.y-y) < BASKETSIZE/2 - BALLSIZE/2 + 1)
	);
}