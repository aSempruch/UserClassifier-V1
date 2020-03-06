import { find_angle, find_distance, radsToDegrees } from './helpers';

export const processRawMouseData = (rawData, basketPos, ballPos) => {

	const { x, y } = rawData;
	const length = x.length;
	// console.log(rawData);

	var divs = [];
	var dists = [];

	var divSum = 0;
	var distSum = 0;

	var ballAngle = radsToDegrees(find_angle(ballPos, basketPos, {x: basketPos.x, y: basketPos.y-1}) + ((ballPos.x < basketPos.x) ? Math.PI : 0));	

	for(var i = 0; i < x.length; i++) {

		const mousePos = {x: x[i], y: y[i]};

		const angle = find_angle(ballPos, basketPos, mousePos);

		const divergence = Math.round(Math.sin(angle) * find_distance(mousePos, basketPos) * 5);
		divSum += divergence;

		const distance = Math.round(Math.cos(angle) * find_distance(mousePos, basketPos)); 
		distSum += distance;
	}

	const procData = {
		ballAngle: ballAngle, // 	Angle between ball and target {0, 360}
		avgDist: Math.round(distSum / length), // Average distance between ball and target
		avgDiv: Math.round(divSum / length), // Average divergence from optimal path as ball is dragged to target
	}

	console.log(procData);
	
}