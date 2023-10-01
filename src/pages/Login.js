import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = {} => {
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
                      id=

            </form>
        </div>
    )
}