import FieldOne from './components/Battlefields/FieldOne/MainFieldOne/FieldOne.jsx';
import FieldTwo from './components/Battlefields/FieldTwo/MainFieldTwo/FieldTwo.jsx';
import Header from './components/Header/Header.jsx'
import Inventory from './components/Inventory/Inventory.jsx';
import NameBox from './components/NameBox/NameBox.jsx';
import PlayerList from './components/PlayerList/List/PlayerList.jsx';
import './App.css';

const App = () => {
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
      </div>
    </div>
  );
}

export default App;
