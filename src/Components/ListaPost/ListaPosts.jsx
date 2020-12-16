import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListaPosts.scss';
import { LikeOutlined, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';
import { DELETE_POST, SET_POSTS } from '../../Redux/types';


export default function ListaPosts({arrayPosts= []}) {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.user)
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


    return (
        <div className="padrePost">

            {arrayPosts?.map(post => {
                return <div className="boxPost" >

                    <div className="cabeceraPost">

                        <img className="imgAvatar" src={post?.autor?.avatar}></img>
                        <div>
                            <div className="nick">{post?.autor?.nick}</div>
                            <div className="nCuenta">@{post?.autor?.nombreCuenta}</div>
                        </div>
                    </div>
                    <div className="mensajePost">{post?.mensaje}</div>

                    <span style={{ fontSize: "0.7em" }}>{moment(post?.fechaCreacion).fromNow()}</span>

                    <span>
                        <Tooltip key="comment-basic-like" title="Like">
                            <span onClick={like}>
                                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                <span className="comment-action">{likes}</span>
                            </span>
                        </Tooltip>
                        <span key="comment-basic-reply-to"> Responder</span>

                        {post?.autor?._id === usuario?._id && <DeleteOutlined onClick={() => deletePost(post?._id)} />}

                    </span>

                </div>

            })}
        </div>
    )
};
