import React, { useState } from 'react';
import volume from "..//../../img/volume.png";
import question from "..//../../img/question.png";
import classes from './Buttons.module.css';
import HelpMenu from '../../Modal/Help_menu/HelpMenu';

const Buttons = () => {
    const [modalHelpActive, setModalHelpActive] = useState(false)
    return (
        <div className={classes.buttons}>
            <img src={question} className={classes.question} onClick={() => setModalHelpActive(true)}/>
            <img src={volume} className={classes.volume} />
            <HelpMenu active={modalHelpActive} setActive={setModalHelpActive}/>
        </div>
    );
}

export default Buttons;
