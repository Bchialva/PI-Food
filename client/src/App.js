import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/'component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
        <Route exact path= '/recipe' component={RecipeCreate}/>
        <Route exact path='/detail/:id' component={RecipeDetails}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
