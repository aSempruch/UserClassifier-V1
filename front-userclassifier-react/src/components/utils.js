import React, { Component } from 'react';
import { find_angle, find_distance, radsToDegrees, generateBallPos, isValidBallPos } from './helpers';
import Ball from './ActionArea/Ball';
import { BALL_COUNT, BASKET_POS } from './constants';

export const processRawMouseData = (rawData, ballPos) => {

	const { x, y } = rawData;
	const length = x.length;
	console.log(rawData);

	var divs = [];
	var dists = [];

	var divSum = 0;
	var distSum = 0;

	var ballAngle = radsToDegrees(find_angle(ballPos, BASKET_POS, {x: BASKET_POS.x, y: BASKET_POS.y-1}) + ((ballPos.x < BASKET_POS.x) ? Math.PI : 0));
	var gapDistance = find_distance(ballPos, BASKET_POS);	

	for(var i = 0; i < x.length; i++) {

		const mousePos = {x: x[i], y: y[i]};

		const angle = find_angle(ballPos, BASKET_POS, mousePos);

		const divergence = Math.round(Math.sin(angle) * find_distance(mousePos, BASKET_POS) * 5);
		divSum += divergence;

		const distance = Math.round(Math.cos(angle) * find_distance(mousePos, BASKET_POS)); 
		distSum += distance;
	}

	const procData = [{
		ballAngle: ballAngle, // 	Angle between ball and target {0, 360}
		avgVelocity: Math.round(gapDistance / rawData.timeIntervals[0] * 100), // Distance between ball and basket
		avgDist: Math.round(distSum / length), // Average distance between ball and target
		avgDiv: Math.round(divSum / length), // Average divergence from optimal path as ball is dragged to target
		timeInterval: rawData.timeIntervals[0]
	}];

	console.log(procData);
	
}

export const generateBalls = () => {
	var result = [], usedPos = [];
	for(let i = 0; i < BALL_COUNT; i++) {
		
		let pos, guard = 0;
		do {
			pos = generateBallPos();
			guard++;

			if(guard > 50) {
				console.error("Took more than 50 tries to generate ball position");
				break;
			}

		} while(!isValidBallPos(pos, usedPos));	
		
		usedPos.push(pos);

		result.push(
			<Ball
				key={i}
				ballPos={pos}
			/>
		);
	}
	return result;
}