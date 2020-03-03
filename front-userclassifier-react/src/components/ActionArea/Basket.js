import React, { Component } from 'react';
import { Circle } from 'react-konva';

import { BASKETSIZE } from '../constants';

export default class Basket extends Component {

  
  render() {
    
    const { basketPos } = this.props;

    return (
      <Circle
        width={BASKETSIZE}
        height={BASKETSIZE}
        x={basketPos.x}
        y={basketPos.y}
        stroke="black"
      />
    );
  }
}