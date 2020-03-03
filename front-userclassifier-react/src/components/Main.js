import React, { Component } from 'react';
import ActionAreaContainer from './ActionArea/ActionAreaContainer';

import { ACT_ENUM } from './constants';

export default class Main extends Component {

	state = {
		actionState: ACT_ENUM.WAIT
	}

	setActionState(nextState) {
		this.setState({actionState: nextState});
	}

	render() {
		return (
			<div>
				<ActionAreaContainer 
					actionState={this.state.actionState}
					setActionState={this.setActionState.bind(this)}
				/>
			</div>
		)
	}
}
