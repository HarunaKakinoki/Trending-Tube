import './App.css';
import { Switch, Route } from "react-router-dom";
import MainConatainer from './containers/MainConatainer';
import AllVideosContainer from './containers/AllVideosContainer';

function App() {
  return (
    <div className="App">
      
      <Switch>

        {/* Index */}
        <Route exact path="/" exact component={MainConatainer}/>

        {/* All Video Info Page */}
        <Route exact path="/all" exact component={AllVideosContainer}/>
      
      </Switch>

    </div>

  );
}

export default App;
