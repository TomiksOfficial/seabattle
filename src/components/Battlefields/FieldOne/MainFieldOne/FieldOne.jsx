import React from 'react';
import classes from './FieldOne.module.css';
import ChekeredField from '../CheckeredFieldOne/CheckeredField/CheckeredFieldOne';
import Img from '../../../../img/coordinates.png';

const FieldOne = () => {
  return (
    <div className={classes.field} >
      <ChekeredField className={classes.ChekeredField}/>
      <img src={Img} />
    </div>
  );
}

export default FieldOne;
