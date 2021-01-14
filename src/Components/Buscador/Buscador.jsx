import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Search from 'antd/lib/input/Search';
import { Comment } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import './Buscador.scss';


export default function Buscador() {

    const usuario = useSelector(state => state.user);
    const [resultados, setResultados] = useState([]);

    const onSearch = async (value) => {
        const header = {
            headers: { Authorization: usuario.token }
        };

        const body = {
            busqueda: value
        };

        try {
            let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/buscar`, body, header);
            setResultados(respuesta.data)

        } catch (error) {
            console.log(error);
            setResultados([])
        }
    };


    return (

        <div className="mainBuscador">
            <Search
                placeholder="Cuenta/nick"
                allowClear
                onSearch={onSearch}
                onChange={(ev) => {
                    if (ev.target.value === "") {
                        setResultados([])
                    }
                }}
            />

            <div className="cajaResultados">
                {resultados.map((resultado) =>
                    <Comment
                        key={resultado._id}
                        actions={null}
                        author={resultado?.nick}
                        avatar={
                            <Avatar
                                src={!resultado?.avatar ? '/Images/NoAvatar.gif' : resultado?.avatar}
                            />
                        }
                        content={
                            <Link to={`/perfil/${resultado?.nombreCuenta}`} className="nCuenta">@{resultado?.nombreCuenta}</Link>
                        }

                        style={{ padding: "0.5em" }}
                    />
                )}
            </div>
        </div>

    )
};

