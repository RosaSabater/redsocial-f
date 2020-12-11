import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './Register.scss';

export default function Register() {

    const history = useHistory();
    const [nick, setNick] = useState("");
    const [nombreCuenta, setNombreCuenta] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const clickRegister = async (event) => {

        try {
            setError("");

            const body = {
                nick: nick,
                nombreCuenta: nombreCuenta,
                email: email,
                password: password
            };

            await axios.post(`${process.env.REACT_APP_APIURL}/registro`, body);

            history.push('/login')


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

                    <input onChange={ev => setNick(ev.target.value)}  placeholder="Nick de usuario"></input>
                    <input onChange={ev => setNombreCuenta(ev.target.value)} placeholder="Nombre de cuenta"></input>
                    <input onChange={ev => setEmail(ev.target.value)} type="email" placeholder="Email"></input>
                    <input onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"></input>

                    <span style={{ "color": "#FB5656" }}>{error}</span>

                    <button onClick={clickRegister}> Registrarse </button>
                    <div>¿Ya tienes cuenta? </div>
                    <Link className="registroLink" to="/login">Inicia sesión.</Link>

                </div>
            </div>
        </div>
    )
};