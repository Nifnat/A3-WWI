import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import Home from "./pages/Home";
import AdminRoles from "./pages/AdminRoles";
import AdminWeb from "./pages/AdminWeb";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light">
        <NavbarBrand>
          <Link to={"/"} className="nav-link">
            {" "}
            Home{" "}
          </Link>
        </NavbarBrand>
        <NavLink>
          <Link to={"/AdminRoles"} className="nav-link">
            {" "}
            Admin Roles{" "}
          </Link>
        </NavLink>
        <NavLink>
          <Link to={"/AdminWeb"} className="nav-link">
            {" "}
            Admin Web{" "}
          </Link>
        </NavLink>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/AdminRoles" component={AdminRoles} />
        <Route exact path="/AdminWeb" component={AdminWeb} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
