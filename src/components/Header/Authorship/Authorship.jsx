import React from 'react';
import clasess from './Authorship.module.css'

const Authorship = () => {
  return (
    <div className={clasess.authorship}>
      <div className={clasess.co}>Сo-authorship:</div>
      <div className={clasess.cospan}>
        Danil Kokosha<br/>
        Daniel Nikolaev<br/>
        Sergey Smekalov
      </div>
    </div>
  );
}

export default Authorship;
