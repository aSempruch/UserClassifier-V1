import { find_angle, find_distance } from './helpers';

export const processRawMouseData = (rawData, basketPos, ballPos) => {

	const { x, y, dragstart, dragend } = rawData;
	console.log(rawData);

	var divs = [];
	var dists = [];

	for(var i = 0; i < x.length; i++) {

		const mousePos = {x: x[i], y: y[i]};

		const angle = find_angle(ballPos, basketPos, mousePos);

		const divergence = Math.round(Math.sin(angle) * find_distance(mousePos, basketPos));
		divs.push(divergence);

		const distance = Math.round(Math.cos(angle) * find_distance(mousePos, basketPos)); 
		dists.push(distance);

		// console.log("Divergence: " + divergence + "\tDistance left: " + distance + "\tAngle: " + Math.round((180*angle)/Math.PI));
	}

	console.log({x: divs, y: dists});
	
}