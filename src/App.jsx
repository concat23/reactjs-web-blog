import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "./pages/Home";



function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/blog/:id" exact component={Blog} /> 
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
