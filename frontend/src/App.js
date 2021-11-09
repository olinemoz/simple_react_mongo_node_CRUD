import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Components/Home/Home";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import Users from "./Components/Users/Users";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/user/update/:id" component={UpdateUser}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
