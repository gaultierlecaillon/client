import GameList from './components/GameList';
import LoginForm from './components/LoginForm';
import GameNew from './components/GameNew';
import logo from './logo.svg';
import './App.css';


function App() {
    return (
        <div className="App">
            <LoginForm/>
            <GameNew/>
            <GameList/>
        </div>
    );
}

export default App;
