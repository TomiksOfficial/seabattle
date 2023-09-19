import logo from "./img/Logo.png"

function App() {
  return (
    <div className="container">
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
