import React, {useEffect, useState } from 'react';
import ActionInfo from '../components/ActionsInfo';
import BoardComponent from '../components/BoardComponent';
import { Board } from '../models/Board';

const wss = new WebSocket('ws://localhost:2000')

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

    const navigate = useNavigate()

    function shoot(x, y) {

    }

    wss.onmessage = function(response) { 
        const {type, payload} = JSON.parse(response.data)
        const { username, x, y, canStart, rivalName, success } = payload

        switch (type) {
            case 'connectToPlay':
                if(!success) {
                    return navigate('/')
                }
                setRivalName(rivalName)
                break;

            case 'readyToPlay':
                if(payload.username === localStorage.nickname && canStart) {
                    setCanShoot(true)
                }
                break;

            case 'afterShootByMe':
                if(username !== localStorage.nickname) {
                    const isPerfectHit = myBoard.cells[y][x].mark?.name === 'ship'
                    changeBoardAfterShoot(myBoard, setMyBoard, x, y, isPerfectHit)
                    wss.send(JSON.stringify({ event: 'checkShoot', payload: {...payload, isPerfectHit}}))
                    if(!isPerfectHit) {
                       setCanShoot(true)
                    }
                }
                break;

            case 'isPerfectHit':
                if(username === localStorage.nickname) {
                    changeBoardAfterShoot(hisBoard, setHisBoard,x, y, payload.isPerfectHit);
                    payload.isPerfectHit ? setCanShoot(true) : setCanShoot(false)
                }
                break;
            default:
              break;
        }
    }

    function changeBoardAfterShoot(board, setBoard, x, y, isPerfectHit) {
        isPerfectHit ? board.addDamage(x,y) : board.assMiss(x,y)
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }


    useEffect(() => {
        wss.send(JSON.stringify({event: 'connect', payload: {username: localStorage.nickname, gameId}}))
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