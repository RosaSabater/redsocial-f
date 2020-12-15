import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Menu } from 'antd';
import axios from 'axios';
import { LOGOUT } from '../../Redux/types';
import './AccesosDirectos.scss';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useHistory } from 'react-router-dom';

export default function AccesosDirectos() {

    const usuario = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = async (event) => {

        try {
            const header = {
                headers: { Authorization: usuario?.token }
            };

            dispatch({ type: LOGOUT });
            localStorage.clear();
            
            history.push('/');

            await axios.post(`${process.env.REACT_APP_APIURL}/logout`, header);


        } catch (error) {
            console.error(error);
        }
    }

    const baja = async (event) => {
        try {
            const header = {
                headers: { Authorization: usuario?.token }
            };

            dispatch({ type: LOGOUT });
            localStorage.clear();
            
            history.push('/');

            await axios.delete(`${process.env.REACT_APP_APIURL}/delete`, header);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="columnaAccesos">
            <div className="boxBotonesAccesos">
                <Button className="botonAccesos" type="primary" style={{
                    background: "lightblue"
                }}>
                    Postear
                </Button>

                <Button className="botonAccesos" type="primary">
                    Inicio
                </Button>


                <Button className="botonAccesos" type="primary" >
                    Mundo
                </Button>


                <Button className="botonAccesos" type="primary">
                    Seguidos
                </Button>


                <Button className="botonAccesos" type="primary">
                    Mensajes
                </Button>


                <Button className="botonAccesos" type="primary">
                    Perfil
                </Button>

                <Menu className="botonAccesos" mode="vertical">
                    <SubMenu key="sub4" title="Opciones">
                        <Menu.Item onClick={logout} key="9">Cerrar sesión</Menu.Item>
                        <Menu.Item onClick={baja} key="10">Eliminar cuenta</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>


            <div className="boxAvatar">
                <Card style={{
                    width: "15em",
                    background: "none",
                    border: "none",
                    textAlign: "center",
                    color: "white"
                }}>
                    <div style={{
                        display: "flex"
                    }}>
                        <img src={usuario?.avatar} style={{
                            width: "5em",
                            height: "4em",
                            borderRadius: "1em"

                        }}></img>

                        <div>
                            <p>{usuario.nick}</p>
                            <p>@{usuario.nombreCuenta}</p>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    )
};