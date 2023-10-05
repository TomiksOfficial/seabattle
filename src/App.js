import FieldOne from './components/Battlefields/FieldOne/FieldOne.jsx';
import FieldTwo from './components/Battlefields/FieldTwo/FieldTwo.jsx';
import Logo from './components/Header/Logo.jsx'
import Inventory from './components/Inventory/Inventory.jsx';
import NameBox from './components/NameBox/NameBox.jsx';
import PlayerList from './components/PlayerList/List/PlayerList.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Logo />
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
      </div>
    </div>
  );
}

export default App;
