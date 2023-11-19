import React from 'react';
import classes from './Inventory.module.css';
import Img from '../../img/ship.png';

const Inventory = () => {
  return (
    <div className={classes.invent} >
      <div>
        <img src={Img} className={classes.img} />
      </div>
    </div>
  );
}

export default Inventory;
