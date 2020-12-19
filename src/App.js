import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import React from 'react'
import 'antd/dist/antd.css';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Home from './Containers/Home/Home';
import Layout from './Components/Layout/Layout';
import Perfil from './Components/Perfil/Perfil';
import Posts from './Components/Posts/Posts';

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
                <Layout>
                    <Posts />
                </Layout>
            </Route>

            <Route path="/perfil">
                <Layout muestraCabecera={false}>
                    <Perfil />
                </Layout>
            </Route>

        </BrowserRouter>

    );
}

export default App;
