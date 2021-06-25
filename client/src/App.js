import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Header from "./components/Header";
import CreateProject from "./screens/projects/CreateProject";
import ProjectDetails from "./screens/projects/ProjectDetails";
import UpdateProject from "./screens/projects/UpdateProject";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/project-details/:slug" component={ProjectDetails} />
        <Route path="/update-project/:slug" component={UpdateProject} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
