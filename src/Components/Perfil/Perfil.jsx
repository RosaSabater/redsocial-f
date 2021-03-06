import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListaPosts from '../ListaPost/ListaPosts';
import './Perfil.scss';

const Perfil = () => {

    const [misPosts, setMisPosts] = useState([]);
    const usuario = useSelector(state => state.user)
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [comprobarFollow, setComprobarFollow] = useState(null);
    const history = useHistory();
    const [localizacion, setLocalizacion] = useState(null);

    let pathname = history.location.pathname.split('/');
    let nombreCuenta = pathname[2];


    useEffect(() => {

        const unlisten = history.listen((location, action) => {
            setLocalizacion(location.pathname);
        })

        return function cleanup() {
            unlisten()
        }

    }, [history]);

    useEffect(() => {

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
                        
                        // devuelve el resultado de las tres promesas en paralelo
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
    }, [localizacion, nombreCuenta, usuario]);

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

    if (!datosUsuario) {
        return <p className="padrePerfil">Ese usuario no existe.</p>
    }
    return (
        <>

            <div className="padrePerfil">

                <img className="avatarPerfil" src={!datosUsuario?.avatar ? '/Images/NoAvatar.gif' : datosUsuario?.avatar} alt="avatar"></img>

                <div className="boxInfoPerfil">
                    <div>{datosUsuario?.nick}</div>
                    <div>@{datosUsuario?.nombreCuenta}</div>
                    <div>País: {datosUsuario?.pais}</div>
                    <div>Ciudad: {datosUsuario?.ciudad}</div>
                    <div>Biografía: {datosUsuario?.biografia}</div>
                    <div className="cabecera">Usuario creado: {new Date(datosUsuario?.fechaCreacion).toLocaleString()}</div>
                </div>
                <div className="boxSeguir" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", textAlign: "center" }}>

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

            <div className="padrePost" style={{
                overflowY: "scroll",
                overflowX: "hidden",
                maxHeight: "60vh"
            }}>
                <ListaPosts arrayPosts={misPosts} />
            </div>

        </>
    )
}

export default Perfil;

