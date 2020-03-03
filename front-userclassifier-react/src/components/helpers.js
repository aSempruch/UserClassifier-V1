export const find_distance = (A, B) => {
	return Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
}

export const find_angle = (A,B,C) => {
	var AB = find_distance(A,B);    
	var BC = find_distance(C,B)
	var AC = find_distance(A,C);
	return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}