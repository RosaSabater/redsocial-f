import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Menu } from 'antd';
import axios from 'axios';
import { LOGOUT } from '../../Redux/types';
import './AccesosDirectos.scss';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, useHistory } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

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
            
            history.push('/');

            await axios.post(`${process.env.REACT_APP_APIURL}/logout`, null, header);


        } catch (error) {
            console.error(error);
        }
    }

    const baja = async (event) => {
        try {
            const header = {
                headers: { Authorization: usuario?.token }
            };

            await logout();

            await axios.delete(`${process.env.REACT_APP_APIURL}/delete`, header);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="columnaAccesos">
            <div className="boxBotonesAccesos">

                <Link to="/homepage"><Button className="botonAccesos" type="primary">
                    Inicio
                </Button></Link>

                <Button className="botonAccesos" type="primary">
                    Seguidos
                </Button>


                {/* <Button className="botonAccesos" type="primary">
                    Mensajes
                </Button> */}


                <Link to="/perfil"><Button className="botonAccesos" type="primary">
                    Perfil
                </Button></Link>

                <Menu className="botonAccesos" mode="horizontal">
                    <SubMenu key="sub4" title={<div style={{display:"flex", alignItems:"center"}}>Opciones &nbsp; <RightOutlined /></div>}>
                        <Menu.Item onClick={logout} key="9">Cerrar sesión</Menu.Item>
                        <Menu.Item onClick={baja} key="10">Eliminar cuenta</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>


            <div className="boxAvatar">
                <Card style={{
                    width: "15em",
                    background: "none",
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.76)",
                    borderRadius: "5em"
                }}>
                    <div style={{
                        display: "flex"
                    }}>
                        <img src={usuario?.avatar} style={{
                            width: "4em",
                            height: "4em",
                            borderRadius: "5em",
                            marginRight: "1em"

                        }}></img>

                        <div>
                            <p>{usuario?.nick}</p>
                            <Link to= {`/perfil/${usuario?.nombreCuenta}`}>@{usuario?.nombreCuenta}</Link>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    )
};