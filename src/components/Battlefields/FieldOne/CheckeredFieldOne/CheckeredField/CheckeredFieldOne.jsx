import React, { useState } from 'react';
import classes from './CheckeredFieldOne.module.css'
import Checker from '../Checker'
// есть ли корабль
// подбита ячейка

const CheckeredFieldOne = () => {

  let [checkers, setCheckers] = useState([
    { x: 1, y: 1, status: 1 },
    { x: 2, y: 1, status: 1 },
    { x: 3, y: 1, status: 1 },
    { x: 4, y: 1, status: 1 },
    { x: 5, y: 1, status: 1 },
    { x: 6, y: 1, status: 1 },
    { x: 7, y: 1, status: 1 },
    { x: 8, y: 1, status: 1 },
    { x: 9, y: 1, status: 1 },
    { x: 10, y: 1, status: 1 },
    { x: 1, y: 2, status: 1 },
    { x: 2, y: 2, status: 1 },
    { x: 3, y: 2, status: 1 },
    { x: 4, y: 2, status: 1 },
    { x: 5, y: 2, status: 1 },
    { x: 6, y: 2, status: 1 },
    { x: 7, y: 2, status: 1 },
    { x: 8, y: 2, status: 1 },
    { x: 9, y: 2, status: 1 },
    { x: 10, y: 2, status: 1 },
    { x: 1, y: 3, status: 1 },
    { x: 2, y: 3, status: 1 },
    { x: 3, y: 3, status: 1 },
    { x: 4, y: 3, status: 1 },
    { x: 5, y: 3, status: 1 },
    { x: 6, y: 3, status: 1 },
    { x: 7, y: 3, status: 1 },
    { x: 8, y: 3, status: 1 },
    { x: 9, y: 3, status: 1 },
    { x: 10, y: 3, status: 1 },
    { x: 1, y: 4, status: 1 },
    { x: 2, y: 4, status: 1 },
    { x: 3, y: 4, status: 1 },
    { x: 4, y: 4, status: 1 },
    { x: 5, y: 4, status: 1 },
    { x: 6, y: 4, status: 1 },
    { x: 7, y: 4, status: 1 },
    { x: 8, y: 4, status: 1 },
    { x: 9, y: 4, status: 1 },
    { x: 10, y: 4, status: 1 },
    { x: 1, y: 5, status: 1 },
    { x: 2, y: 5, status: 1 },
    { x: 3, y: 5, status: 1 },
    { x: 4, y: 5, status: 1 },
    { x: 5, y: 5, status: 1 },
    { x: 6, y: 5, status: 1 },
    { x: 7, y: 5, status: 1 },
    { x: 8, y: 5, status: 1 },
    { x: 9, y: 5, status: 1 },
    { x: 10, y: 5, status: 1 },
    { x: 1, y: 6, status: 1 },
    { x: 2, y: 6, status: 1 },
    { x: 3, y: 6, status: 1 },
    { x: 4, y: 6, status: 1 },
    { x: 5, y: 6, status: 1 },
    { x: 6, y: 6, status: 1 },
    { x: 7, y: 6, status: 1 },
    { x: 8, y: 6, status: 1 },
    { x: 9, y: 6, status: 1 },
    { x: 10, y: 6, status: 1 },
    { x: 1, y: 7, status: 1 },
    { x: 2, y: 7, status: 1 },
    { x: 3, y: 7, status: 1 },
    { x: 4, y: 7, status: 1 },
    { x: 5, y: 7, status: 1 },
    { x: 6, y: 7, status: 1 },
    { x: 7, y: 7, status: 1 },
    { x: 8, y: 7, status: 1 },
    { x: 9, y: 7, status: 1 },
    { x: 10, y: 7, status: 1 },
    { x: 1, y: 8, status: 1 },
    { x: 2, y: 8, status: 1 },
    { x: 3, y: 8, status: 1 },
    { x: 4, y: 8, status: 1 },
    { x: 5, y: 8, status: 1 },
    { x: 6, y: 8, status: 1 },
    { x: 7, y: 8, status: 1 },
    { x: 8, y: 8, status: 1 },
    { x: 9, y: 8, status: 1 },
    { x: 10, y: 8, status: 1 },
    { x: 1, y: 9, status: 1 },
    { x: 2, y: 9, status: 1 },
    { x: 3, y: 9, status: 1 },
    { x: 4, y: 9, status: 1 },
    { x: 5, y: 9, status: 1 },
    { x: 6, y: 9, status: 1 },
    { x: 7, y: 9, status: 1 },
    { x: 8, y: 9, status: 1 },
    { x: 9, y: 9, status: 1 },
    { x: 10, y: 9, status: 1 },
    { x: 1, y: 10, status: 1 },
    { x: 2, y: 10, status: 1 },
    { x: 3, y: 10, status: 1 },
    { x: 4, y: 10, status: 1 },
    { x: 5, y: 10, status: 1 },
    { x: 6, y: 10, status: 1 },
    { x: 7, y: 10, status: 1 },
    { x: 8, y: 10, status: 1 },
    { x: 9, y: 10, status: 1 },
    { x: 10, y: 10, status: 1 },
  ]);

  return (
    // <div className={classes.grid}>
    //   {checkers.map((c) => <Checker x={c.x} y={c.y} status={c.status} callback={
    //     setCheckers
    //   } />)}
    // </div>

    <div className={classes.grid}>
      {checkers.map((c, index) => <Checker key={index} x={c.x} y={c.y} status={c.status}/>)}
    </div>
  );
}

export default CheckeredFieldOne; 