import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';


export default function Home() {

    const history = useHistory();

    const pulsaEmpezar = async (event) => {

        try {
            // event.preventDefault();

            history.push('/login')


        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>

            <div className="padreHome">

                <div className="headerHome">
                    <button onClick={()=> window.open("http://www.lu-rp.es/foro/", "_blank")} className="enlacesBotonHome">Foro</button>
                    <button onClick={()=> window.open("http://invite.teamspeak.com/ts3.lu-rp.es/", "_blank")} className="enlacesBotonHome">TS3</button>
                    <button onClick={()=> window.open("https://discord.com/invite/lurpes", "_blank")} className="enlacesBotonHome">Discord</button>
                </div>

                <div className="luImg"></div>

                <div className="divBotonHome">
                    <button onClick={pulsaEmpezar} className="botonHome">¡Acceder!</button>
                </div>
            </div>

        </>
    )
};


