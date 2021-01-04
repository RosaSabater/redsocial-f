import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './Postear.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ADD_POST } from '../../Redux/types';

export default function Postear() {

    const usuario = useSelector(state => state.user);
    const [mensaje, setMensaje] = useState("");
    const dispatch = useDispatch();
    const { Panel } = Collapse;
    const { TextArea } = Input;

    function callback(key) {
        console.log(key);
    }

    const Publicar = async (ev) => {
        try {
            const header = {
                headers: { Authorization: usuario.token }
            };

            const body = {
                mensaje: mensaje
            };

            let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/post`, body, header);

            let objetoPost = respuesta.data.objetoPost;
            objetoPost.autor = {
                _id: usuario._id,
                nick: usuario.nick,
                nombreCuenta: usuario.nombreCuenta,
                avatar: usuario.avatar
            }

            dispatch({ type: ADD_POST, payload: objetoPost })

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Collapse className="padrePostear" defaultActiveKey={['0']} onChange={callback}>
                <div className="cabeceraPostear">
                    <img className="imgAvatarPostear" src={usuario?.avatar}></img>
                    <div>
                        <div className="nickPostear">{usuario?.nick}</div>
                        <div className="nCuentaPostear">@{usuario?.nombreCuenta}</div>
                    </div>
                </div>
                <Panel header="Postear" key="1">
                    <TextArea onChange={ev => setMensaje(ev.target.value)} rows={3} />
                    <Button onClick={Publicar} style={{ backgroundColor: "#687BB1", border: "none" }} type="primary" block>
                        Postear
                </Button>
                </Panel>
            </Collapse>
        </>
    );
};