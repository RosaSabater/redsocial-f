import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_POSTS } from '../../Redux/types';
import ListaPosts from '../ListaPost/ListaPosts';


export default function Posts() {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.user)
    const post = useSelector(state => state.post)

    try {
        useEffect(() => {

            const fnc = async () => {
                try {
                    const header = {
                        headers: { Authorization: usuario.token }
                    };

                    let respuesta = await axios.post(`${process.env.REACT_APP_APIURL}/getPosts`, null, header);

                    dispatch({ type: SET_POSTS, payload: respuesta.data })

                } catch (error) {
                    console.log(error);
                }
            }
            fnc();
        }, [dispatch, usuario.token]);



    } catch (error) {
        console.log(error)
    }


    return (
        <div className="padrePost">
            <ListaPosts arrayPosts={post} />
        </div>
    )
};
