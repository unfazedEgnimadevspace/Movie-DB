import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/main-nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./components/Pages/Trending/trending.component.jsx";
import Series from "./components/Pages/Series/series.component.jsx";
import Search from "./components/Pages/Search/search.component.jsx";
import Movies from "./components/Pages/Movies/movies.component.jsx";
const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" exact component={Trending} />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
};
export default App;
