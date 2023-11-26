import FieldOne from './components/Battlefields/FieldOne/MainFieldOne/FieldOne.jsx';
import FieldTwo from './components/Battlefields/FieldTwo/MainFieldTwo/FieldTwo.jsx';
import Header from './components/Header/Header.jsx'
import Inventory from './components/Inventory/Inventory.jsx';
import NameBox from './components/NameBox/NameBox.jsx';
import PlayerList from './components/PlayerList/List/PlayerList.jsx';
import EnterNickname from './components/Modal/EnterNickname/EnterNickname.jsx';
import './App.css';
import { useState } from 'react';
import JoinTheGame from './components/Modal/JoinTheGame/JoinTheGame.jsx';
import WaitingResponse from './components/Modal/WaitingResponse/WaitingResponse.jsx';

const App = () => {

  {/* Состояние модальных окн */}
  const [modalEnterActive,setModalEnterActive] = useState(true);
  const [modalJoinTheGame,setModalJoinTheGame] = useState(false);
  const [modalWaitingResponse,setModalWaitingResponse] = useState(false);

  return (
    <div className="app">
      <Header />
      <div className="mainMenu">
        <div className="playerMenu">
          <NameBox />
          <PlayerList />
        </div>
        <div className="playGround">
          <FieldOne />
          <FieldTwo />
          <Inventory />
        </div>
      {/* Модальные окна */}
      </div> 
      <EnterNickname active={modalEnterActive} setActive={setModalEnterActive}/>
      <JoinTheGame active={modalJoinTheGame} setActive={setModalJoinTheGame}/>
      <WaitingResponse active={modalWaitingResponse} setActive={setModalWaitingResponse}/>
    </div>
  );
}

export default App;
