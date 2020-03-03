import React, { Component } from 'react';
import { Group, Circle, Text } from 'react-konva';

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
		const { ballPos } = this.props;
		
		if(!inBasket) {
			return (
				// TODO: Change hard coded starting pos
				<Group
					x = {ballPos.x}
					y = {ballPos.y}
					draggable
					onDragEnd={(e) => { this.props.mouseActivityHandler(e); this.checkBasket(e) }}
					onDragStart={(e) => { this.props.setActionState(ACT_ENUM.PLAY); this.props.mouseActivityHandler(e) }}
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
					<Text
						text="1"
						fill="white"
						fontSize={20}
						offset={{x: 7, y: 9}}
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