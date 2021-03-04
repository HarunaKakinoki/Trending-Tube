import './App.css';
import { Switch, Route } from "react-router-dom";
import MainConatainer from './containers/MainConatainer';
import AllVideosContainer from './containers/AllVideosContainer';

function App() {
  return (
    <Switch>
      <div className="App">

        {/* Index */}
        <Route exact path="/" exact>
          <MainConatainer />
        </Route>

        {/* All Video Info Page */}
        <Route exact path="/all" exact>
          <AllVideosContainer />
        </Route>

      </div>
    </Switch>
  );
}

export default App;
