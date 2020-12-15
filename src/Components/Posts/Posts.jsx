import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Post.scss';


export default function Posts() {


    const [posts, setPosts] = useState([]);
    const usuario = useSelector(state => state.user)

    try {
        // event.preventDefault();

        useEffect(() => {

            const fnc = async () => {
                try {
                    const header = {
                        headers: { Authorization: usuario.token }
                    };

                    let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/getPosts`, null, header);

                    setPosts(respuesta.data);

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
        <div className="padrePost">

            {posts?.map(post => {

                return <div className="boxPost" >
                    <div className="cabeceraPost">
                        <img className="imgAvatar" src={usuario.avatar}></img>
                        <div>
                        <div>{usuario.nick}</div>
                        <div>@{usuario.nombreCuenta}</div>
                        </div>
                    </div>
                    <div className="mensajePost">{post.mensaje}</div>
                </div>
            })}

        </div>
    )
};


