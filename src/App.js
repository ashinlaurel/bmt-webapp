import React from "react";
import Form from "./comps/Form";
import Hero from "./comps/AddMember";
import Navbar from "./comps/NavBar";
import {
  BrowserRouter ,
  Switch,
  Route,
  useParams,Link
} from "react-router-dom";
import AddMember from "./comps/AddMember";
import Home from "./comps/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter >
      <Route exact path="/" component={Home}/>
    <Route exact path="/member" component={AddMember}/>
    </BrowserRouter>  

     
    </div>
  );
}

export default App;
