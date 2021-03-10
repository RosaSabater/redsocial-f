import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './Login.scss';
import { LOGIN } from '../../Redux/types';
import { useDispatch } from 'react-redux';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const history = useHistory();
    const dispatch = useDispatch();

    const clickLogin = async (event) => {

        try {
            setError("");

            const body = {
                email: email,
                password: password
            };

            let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/login`, body);

            dispatch({ type: LOGIN, payload: respuesta.data })

            history.push('/homepage')


        } catch (error) {
            if (error.response) {
                return setError(error.response.data.message);
            }
            console.log(error)
        }
    }

    return (
        <div className="padreHome">
            <div className="headerHome">

                <button onClick={() => window.open("http://www.lu-rp.es/foro/", "_blank")} className="enlacesBotonHome">Foro</button>
                <button onClick={() => window.open("http://invite.teamspeak.com/ts3.lu-rp.es/", "_blank")} className="enlacesBotonHome">TS3</button>
                <button onClick={() => window.open("https://discord.com/invite/lurpes", "_blank")} className="enlacesBotonHome">Discord</button>

            </div>

            <div className="luImgLogin"></div>

            <div className="backgroundLogin">
                <div className="login">

                    <input onChange={ev => setEmail(ev.target.value)} type="email" placeholder="Email"></input>
                    <input onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"></input>

                    <span style={{ "color": "#FB5656" }}>{error}</span>

                    <button onClick={clickLogin}> Iniciar sesión </button>
                    <div>¿No tienes cuenta todavía? </div>
                    <Link className="registroLink" to="/register">Regístrate.</Link>

                </div>
            </div>
        </div>
    )
};

