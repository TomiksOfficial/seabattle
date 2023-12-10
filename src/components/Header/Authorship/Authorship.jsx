import React from 'react';
import clasess from './Authorship.module.css'

const Authorship = () => {
  return (
    <div className={clasess.authorship}>
      <div className={clasess.co}>Сo-authorship:</div>
      <div className={clasess.cospan}>
        <a href="https://vk.com/br0k0vich" target="_blank">Danil Kokosha<br/></a>
        <a href="https://vk.com/tomiksofficial" target="_blank">Daniel Nikolaev<br/></a>
        <a href="https://vk.com/milbly" target="_blank">Sergey Smekalov<br/></a>
      </div>
    </div>
  );
}

export default Authorship;
