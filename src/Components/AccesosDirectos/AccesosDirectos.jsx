import React from 'react';
import { useSelector } from 'react-redux';
import './AccesosDirectos.scss';

export default function AccesosDirectos() {

    const usuario = useSelector(state => state.user);

    return (
        <div className="columnaAccesos">
            <div className="boxBotonesAccesos">
                
                <div className="botonAccesos">Inicio</div>
                <div className="botonAccesos">Mundo</div>
                <div className="botonAccesos">Seguidos</div>
                <div className="botonAccesos">Mensajes</div>
                <div className="botonAccesos">Perfil</div>
                <div className="botonAccesos">Opciones</div>
            </div>

            <div className="boxAvatar">
                <img src={usuario.avatar} className="imagenAvatar"></img>
                <div>
                    {usuario.nick} <br />
                    @{usuario.nombreCuenta}
                </div>
            </div>
        </div>
    )
};