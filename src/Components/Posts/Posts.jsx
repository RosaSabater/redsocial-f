import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeOutlined, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';
import { DELETE_POST, SET_POSTS } from '../../Redux/types';
import ListaPosts from '../ListaPost/ListaPosts';


export default function Posts() {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.user)
    const post = useSelector(state => state.post)
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    const deletePost = async (_id) => {
        try {
            const header = {
                headers: { Authorization: usuario.token }
            };

            let body = {
                _id: _id
            }
           await axios.post(`${process.env.REACT_APP_APIURL}/borrarPost`, body, header);

            dispatch({
                type: DELETE_POST, payload: _id
            })
        } catch (error) {
            console.log(error)
        }
    };


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
        }, []);



    } catch (error) {
        console.log(error)
    }


    return (
        <div className="padrePost">
            <ListaPosts arrayPosts={post}/>
        </div>
    )
};
