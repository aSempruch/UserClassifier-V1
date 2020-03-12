import React, { Component } from 'react';
import { find_angle, find_distance, radsToDegrees, generateBallPos, isValidBallPos } from './helpers';
import Ball from './ActionArea/Ball';
import { BALL_COUNT } from './constants';

export const processRawMouseData = (rawData, basketPos, ballPos) => {

	const { x, y } = rawData;
	const length = x.length;
	console.log(rawData);

	var divs = [];
	var dists = [];

	var divSum = 0;
	var distSum = 0;

	var ballAngle = radsToDegrees(find_angle(ballPos, basketPos, {x: basketPos.x, y: basketPos.y-1}) + ((ballPos.x < basketPos.x) ? Math.PI : 0));
	var gapDistance = find_distance(ballPos, basketPos);	

	for(var i = 0; i < x.length; i++) {

		const mousePos = {x: x[i], y: y[i]};

		const angle = find_angle(ballPos, basketPos, mousePos);

		const divergence = Math.round(Math.sin(angle) * find_distance(mousePos, basketPos) * 5);
		divSum += divergence;

		const distance = Math.round(Math.cos(angle) * find_distance(mousePos, basketPos)); 
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

export const generateBalls = (basketPos) => {
	var result = [], usedPos = [];
	for(let i = 0; i < BALL_COUNT; i++) {
		
		let pos, guard = 0;
		do {
			pos = generateBallPos();
			// console.log('generated Pos: ' + pos.x + ':' + pos.y + " isValid: " + isValidBallPos(pos, usedPos, basketPos))
			guard++;

			if(guard > 50) {
				console.error("Took more than 50 tries to generate ball position");
				break;
			}

		} while(!isValidBallPos(pos, usedPos, basketPos));	
		
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