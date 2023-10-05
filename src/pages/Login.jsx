import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [invitationGame, setInvitationGame] = useState()
    const [gameId, setGameId] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate()
    const startPlay = (e) => {
        e.preventDefault()
        if(nickname && gameId) {
            localStorage.nickname = nickname
            navigate('/game/' + gameId)
        }
    }
    return (
        <div>
            <h2> Авторизация </h2>
            <form onSubmit={startPlay}>
                <div className='field-group'>
                    <div><label htmlFor="nickname"></label></div>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      onChange={e => setNickname(e.target.value)} />
                </div>
                <div onChange={(e) => setInvitationGame(e.target.id === 'ingame')} className="field-group">
                    <input
                     tupe="radio"
                     name="typeEnter"
                     id="gen"
                     value={!invitationGame}
                     defaultChecked={!invitationGame}

                     />
                     <label htmlFor="gen"> Создать игру </label>
                     <input
                     tupe="radio"
                     name="typeEnter"
                     id="ingame"
                     value={invitationGame}
                     defaultChecked={invitationGame}

                     />
                    <label htmlFor="ingame"> Войти по идентификатору </label>
                </div>
                <div className="field-group">
                     {invitationGame ? (
                        <>
                          <div>
                            <label htmlFor="gameId"> Введите идентификатор игры </label>
                          </div>
                          <input
                          tupe="rext"
                          name="gameId"
                          defaultValue=""
                          id="gameId"
                          onChange={e => setGameId=(e.target.value)} />
                          </>

                     ) : (
                        <>
                          <button
                            className="btn-gen"
                            onClick={(e) => {
                                e.preventDefault()
                                setGameId(Date.now())
                            }}>
                            Сгенерировать идентификатор игры
                            </button>
                            <p>{gameId}</p>
                        </>     

                    )}
                </div>
                
                <button type="submit" className="btn-ready"> ГИРАТЬ </button>
            </form>
        </div>
    );
}

export default Login;