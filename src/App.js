import logo from "./img/Logo.png"
/* import GamePage from './pages/GamePage'
import Login from './pages/Login' */

function App() {
  return (
    <div className="container">
     <BrouserRouter>  
      <Routes>
        <Route path='/' element={<login /> }/>
        <Route path='/game'>
          <Route path=':gameId' element={<GamePage />} />
          </Route>
      </Routes>
      </BrouserRouter> 
      <div className="logo"><img src={logo}/></div>
      <div className="NameBox">
        <span></span>
      </div>
      <div className="LeftMenu">
        <div className="HeadListBox"></div>
      </div>
      <div className="BottomBox"></div>
      <div className="PlayerBox1"></div>
      <div className="PlayerBox2"></div>
    </div>
    
  );
}

export default App;
