import React, { Component } from 'react';
import { Circle } from 'react-konva';

import { BASKET_POS, BASKETSIZE } from '../constants';

export default class Basket extends Component {

  
  render() {

    return (
      <Circle
        width={BASKETSIZE}
        height={BASKETSIZE}
        x={BASKET_POS.x}
        y={BASKET_POS.y}
        stroke="black"
      />
    );
  }
}