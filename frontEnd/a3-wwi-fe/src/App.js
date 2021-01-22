import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import AdminRoles from "./pages/AdminRoles"
import AdminWeb from "./pages/AdminWeb"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to ={"/"} className = "nav-link"> Home </Link>
          </li>
          <li>
            <Link to ={"/AdminRoles"} className = "nav-link"> Home </Link>
          </li>
          <li>
            <Link to ={"/AdminWeb"} className = "nav-link"> Home </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/AdminRoles' component={AdminRoles} />
        <Route exact path='/AdminWeb' component={AdminWeb} />
      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
