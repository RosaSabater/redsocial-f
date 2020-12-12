import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import React from 'react'
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Home from './Containers/Home/Home';
import Homepage from './Containers/Homepage/Homepage';
import AccesosDirectos from './Components/AccesosDirectos/AccesosDirectos';

function App() {
    return (
        <BrowserRouter>

            <Route path="/" exact>
                <Home />
            </Route>

            <Route path="/login" exact>
                <Login />
            </Route>

            <Route path="/register" exact>
                <Register />
            </Route>

            <Route path="/homepage" exact>
                <Homepage />
            </Route>



        </BrowserRouter>

    );
}

export default App;
