import React, { useState } from 'react';
import volume from "..//../../img/volume.png";
import novolume from "..//../../img/novolume.png";
import question from "..//../../img/question.png";
import classes from './Buttons.module.css';
import HelpMenu from '../../Modal/HelpMenu/HelpMenu';
import useSound from 'use-sound';
import SeryogaMusic from '../../../music/SeryogaMusic2.mp3'


const Buttons = () => {
    const [modalHelpActive, setModalHelpActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound ,loop}] = useSound(SeryogaMusic, {loop:true});
    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    }

    return (
        <div className={classes.buttons}>
            <img src={question} className={classes.question} onClick={() => setModalHelpActive(true)} />
            
            {!isPlaying ? (
                <img src={novolume} className={classes.volume} onClick={playingButton} />
            ) : (
                <img src={volume} className={classes.volume} onClick={playingButton} />
            )}

            <HelpMenu active={modalHelpActive} setActive={setModalHelpActive} />
        </div>
    );
}

export default Buttons;
