import React, {useEffect, useState } from 'react';
import ActionInfo from '../components/ActionsInfo';
import BoardComponent from '../components/BoardComponent';
import { Board } from '..' 

const GamePage = () => {

    const {gameId} = useParams()
    
    return (
        <div>
            <p> chto-to na arm9nskom </p>
            <div className='boards-container'>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default GamePage;