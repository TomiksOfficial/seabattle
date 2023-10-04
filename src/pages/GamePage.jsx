import React, {useEffect, useState } from 'react';
import ActionInfo from '../components/ActionsInfo';
import BoardComponent from '../components/BoardComponent';
import { Board } from '..' 

const GamePage = () => {
    const[myBoard, setMyBoard] = useState(new Board());
    const[hisBoard, setHisBoard] = useState(new Board());
    const[rivalName, setRivalName] = useState('')
    const[shipsReady, setShipsReady] = useState(false)
    const[canShoot, setCanShoot] = useState(false)
    const {gameId} = useParams() 

    function restart() {
        const newMyBoard = new Board()
        const newHisBoard = new Board()
        newMyBoard.inintCells()
        newHisBoard.inintCells()
        setMyBoard(newMyBoard)
        setHisBoard(newHisBoard)
    }

    function shoot(x, y) {

    }

    useEffect(() => {
        restart()
    }, [])
    
    return (
        <div>
            <p> chto-to na arm9nskom </p>
            <div className='boards-container'>
                <div>
                    <p className='nick'>{localStorage.nickname}</p>
                    <BoardComponent
                         board={myBoard}
                         isMyBoard
                         shipsready={shipsReady}
                         setBoard={setMyBoard}
                         canShoot={false}
                    />
                </div>
                <div>
                    <p className='nick'>{rivalName || 'Poka neizvesten vrag'}</p>
                    <BoardComponent
                         board={hisBoard}
                         setBoard={setHisBoard}
                         canShoot={canShoot}
                         shipsReady={shipsReady}
                         shoot={shoot}
                    />
                </div>
            </div>
        </div>
    );
}

export default GamePage;