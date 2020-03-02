import React, { Component } from 'react';
import { Circle } from 'react-konva';

import { BASKETSIZE } from './constants';

export default class Basket extends Component {

  
  render() {
    
    const { basketPos } = this.props;

    return (
      <Circle
        width={BASKETSIZE}
        height={BASKETSIZE}
        x={window.innerWidth/2}
        y={window.innerHeight/2}
        stroke={5}
      />
    );
  }
}