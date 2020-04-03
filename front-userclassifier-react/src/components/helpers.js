import { BALL_SPACING, BALLSIZE, BASKET_POS, ACTION_AREA_HEIGHT, ACTION_AREA_WIDTH } from './constants';

export const find_distance = (A, B) => {
	return Math.sqrt(Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2));
}

export const find_angle = (A,B,C) => {
	var AB = find_distance(A,B);    
	var BC = find_distance(C,B)
	var AC = find_distance(A,C);
	return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

export const radsToDegrees = (rads) => {
	return Math.round((180*rads)/Math.PI);
}

export const generateBallPos = () => {

	const totalSpacing = BALLSIZE + BALL_SPACING;

	const generator = (max) => {
		return Math.floor( Math.random() * (max - totalSpacing*2) + totalSpacing )
	}

	return {
			x: generator(ACTION_AREA_WIDTH),
			y: generator(ACTION_AREA_HEIGHT)
	};
}

export const isValidBallPos = (pos, usedPos) => {
	
	let totalSpacing = BALLSIZE + BALL_SPACING;
	
	const isValid = (a, b) => (Math.abs(a - b) > totalSpacing);

	if(!isValid(pos.x, BASKET_POS.x) && !isValid(pos.y, BASKET_POS.y)) { return false }; // Is not too close to basket
	
	for (const p of usedPos) {
		if(!isValid(pos.x, p.x) && !isValid(pos.y, p.y)) { return false; } // Is not too close to existing ball
	}

	return true;
}

export const extractBallsPos = (balls) => {
	var ballsPos = [];
	balls.forEach(b => {
		ballsPos.push(b.props.ballPos);
	})
	return ballsPos;
}