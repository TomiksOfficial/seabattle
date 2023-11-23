import React from 'react';
import classes from './FieldTwo.module.css';
import { ChekeredFieldTwo } from '../CheckeredFieldTwo/CheckeredField/ChekeredFieldTwo.jsx';
import Img from '../../../../img/coordinates.png';

const FieldTwo = () => {
  return (
    <div className={classes.field} >
      <ChekeredFieldTwo />
      <img src={Img} />
    </div>
  );
}

export default FieldTwo;
