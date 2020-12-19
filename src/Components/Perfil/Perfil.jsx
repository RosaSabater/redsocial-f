import { DeleteOutlined, EditOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import ListaPosts from '../ListaPost/ListaPosts';
import './Perfil.scss';

const Perfil = () => {

    const [misPosts, setMisPosts] = useState([]);
    const usuario = useSelector(state => state.user)
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [comprobarFollow, setComprobarFollow] = useState(null);
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);
    const history = useHistory();
    const [localizacion, setLocalizacion] = useState(null);

    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to"> Responder</span>,
    ];

    let pathname = history.location.pathname.split('/');
    let nombreCuenta = pathname[2];

    
    useEffect(() => {
        console.log('escucho')
        
        const unlisten = history.listen((location, action) => {
            console.log(location.pathname)
            setLocalizacion(location.pathname);
        })
        
        return function cleanup(){
            console.log('dejo de escuchar')
            unlisten()
        }

    }, [])

    useEffect(() => {
        console.log('me lanzo', localizacion)

        const fnc = async () => {
            try {

                // miro mi propio perfil
                if (!nombreCuenta) {
                    try {
                        const header = {
                            headers: { Authorization: usuario.token }
                        };

                        const body = {
                            nombreCuentaAutor: usuario.nombreCuenta
                        };

                        let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/getPosts`, body, header);

                        setDatosUsuario(usuario);
                        setMisPosts(respuesta.data);

                    } catch (error) {
                        console.log(error);
                    }
                    // miro el perfil de otro
                } else {
                    try {
                        const header = {
                            headers: { Authorization: usuario.token }
                        };

                        // let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/getPosts`, {nombreCuentaAutor: nombreCuenta}, header);
                        // let respuestaPerfil =  await axios.post(`${process.env.REACT_APP_APIURL}/perfil`, {nombreCuenta}, header);

                        // devuelve el resultado de las dos promesas en paralelo
                        let respuestaPromesas = await Promise.all([
                            axios.post(`${process.env.REACT_APP_APIURL}/getPosts`, { nombreCuentaAutor: nombreCuenta }, header),
                            axios.post(`${process.env.REACT_APP_APIURL}/perfil`, { nombreCuenta }, header),
                            axios.post(`${process.env.REACT_APP_APIURL}/comprobarFollow`, { destino: nombreCuenta }, header),
                        ]);

                        // comprobar follow contiene yoTeSigo y tuMeSigues
                        let [respuesta, respuestaPerfil, comprobarFollow] = respuestaPromesas;

                        setComprobarFollow(comprobarFollow.data);
                        setDatosUsuario(respuestaPerfil.data);
                        setMisPosts(respuesta.data);

                    } catch (error) {
                        console.log(error);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }
        fnc();
    }, [localizacion]);

    const pulsaFollow = async () => {
        const header = {
            headers: { Authorization: usuario.token }
        };

        // clono el estado comprobarFollow y muto la propiedad yoTeSigo
        let nuevoComprobarFollow = { ...comprobarFollow, yoTeSigo: true };
        // y ahora esto va a ser el estado
        setComprobarFollow(nuevoComprobarFollow);

        await axios.post(`${process.env.REACT_APP_APIURL}/darFollow`, { destino: datosUsuario?.nombreCuenta }, header)
    };

    const pulsaUnfollow = async () => {
        const header = {
            headers: { Authorization: usuario.token }
        };

        // clono el estado comprobarFollow y muto la propiedad yoTeSigo
        let nuevoComprobarFollow = { ...comprobarFollow, yoTeSigo: false };
        // y ahora esto va a ser el estado
        setComprobarFollow(nuevoComprobarFollow);

        await axios.post(`${process.env.REACT_APP_APIURL}/quitarFollow`, { destino: datosUsuario?.nombreCuenta }, header)
    };

    return (
        <>

            <div className="padrePerfil">

                <img className="avatarPerfil" src={datosUsuario?.avatar}></img>

                <div className="boxInfoPerfil">
                    <div>{datosUsuario?.nick}</div>
                    <div>@{datosUsuario?.nombreCuenta}</div>
                    <div>País: {datosUsuario?.pais}</div>
                    <div>Ciudad: {datosUsuario?.ciudad}</div>
                    <div>Biografía: {datosUsuario?.biografia}</div>
                    <div className="cabecera">Usuario creado: {new Date(datosUsuario?.fechaCreacion).toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", textAlign: "center" }}>

                    {/* Si comprobar follow es truthy veo el perfil de otro */}
                    {comprobarFollow &&
                        <>
                            {comprobarFollow.yoTeSigo
                                ?
                                <Button danger onClick={pulsaUnfollow}>Dejar de seguir</Button>
                                :
                                <Button onClick={pulsaFollow}>Seguir</Button>
                            }
                            {comprobarFollow.tuMeSigues
                                ?
                                <div>Te sigue</div>
                                :
                                <div>No te sigue</div>
                            }
                        </>
                    }
                    {/* Si comprobar follow es false veo mi propio perfil */}
                    {
                        !comprobarFollow &&
                        <Button style={{ borderRadius: "1em" }}><EditOutlined /></Button>
                    }
                </div>

            </div>

            <div className="padrePost">
                <ListaPosts arrayPosts={misPosts} />
            </div>

        </>
    )
}

export default Perfil;

