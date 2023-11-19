import React from 'react';
import classes from './FieldTwo.module.css';
import ChekeredField from '../CheckeredFieldTwo/ChekeredFieldTwo.jsx';
import Img from '../../../../img/coordinates.png';

const FieldTwo = () => {
  return (
    <div className={classes.field} >
      <ChekeredField />
      <img src={Img} />
    </div>
  );
}

export default FieldTwo;
