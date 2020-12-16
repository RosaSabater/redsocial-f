import { DeleteOutlined, EditOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListaPosts from '../ListaPost/ListaPosts';
import './Perfil.scss';

const Perfil = () => {

    const [misPosts, setMisPosts] = useState([]);
    const usuario = useSelector(state => state.user)
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);

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

    try {
        // event.preventDefault();

        useEffect(() => {

            const fnc = async () => {
                try {
                    const header = {
                        headers: { Authorization: usuario.token }
                    };

                    let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/getMisPost`, null, header);

                    setMisPosts(respuesta.data);

                } catch (error) {
                    console.log(error);
                }
            }
            fnc();
        }, []);


    } catch (error) {
        console.log(error)
    }

    return (
        <>
        
            <div className="padrePerfil">

                <img className="avatarPerfil" src={usuario?.avatar}></img>

                <div className="boxInfoPerfil">
                    <div>{usuario.nick}</div>
                    <div>@{usuario.nombreCuenta}</div>
                    <div>País: {usuario?.pais}</div>
                    <div>Ciudad: {usuario?.ciudad}</div>
                    <div>Biografía: {usuario?.biografia}</div>
                    <div className="cabecera">Usuario creado: {new Date(usuario.fechaCreacion).toLocaleString()}</div>
                </div>
                <Button style={{ borderRadius: "1em" }}><EditOutlined /></Button>

            </div>

            <div className="padrePost">
                <ListaPosts arrayPosts={misPosts}/>
            </div>

        </>
    )
}

export default Perfil;
