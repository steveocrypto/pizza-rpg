import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClassBased } from "routes/ClassBased";
import { ComponentBased } from "routes/ComponentBased";
import { Header } from "layout/Header";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/class" render={() => <ClassBased />} />
        <Route path="/component" render={() => <ComponentBased />} />
        <Route path="/" render={() => <ClassBased />} />
      </Switch>
    </Router>
  );
}

export default App;
