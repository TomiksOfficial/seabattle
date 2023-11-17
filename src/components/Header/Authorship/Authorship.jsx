import React from 'react';
import clasess from './Authorship.module.css'

const Authorship = () => {
  return (
    <div className={clasess.authorship}>
      <div className={clasess.co}>Сo-authorship:</div>
      <div>
        Danil Kokosha<br/>
        Daniel Nikolaev<br/>
        Sergey Smekalov
      </div>
    </div>
  );
}

export default Authorship;
