import React from 'react';
const BoardComponent = ({board, setBoard, shipsReady, isMyBoard, canShoot, shoot}) => {

    const boardClasses = ['board']

    if(canShoot) {
        boardClasses.push('active-shoot')
    }


    return (
        <div className={boardClasses.join(' ')}>

        </div>
    

    );
}

export default BoardComponent;