import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListaPosts.scss';
import { LikeOutlined, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import { Comment, Divider, Tooltip } from 'antd';
import moment from 'moment';
import { DELETE_POST, LIKE_POST, UNLIKE_POST } from '../../Redux/types';
import { Link } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import Avatar from 'antd/lib/avatar/avatar';


export default function ListaPosts({ arrayPosts = [] }) {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.user)
    const [contenidoModal, setContenidoModal] = useState(null);


    const pulsaLike = async (esLike, _id) => {

        try {
            const header = {
                headers: { Authorization: usuario.token }
            };

            let body = {
                destino: _id
            };

            if (esLike) {
                dispatch({
                    type: LIKE_POST, payload: {
                        nick: usuario?.nick,
                        nombreCuenta: usuario?.nombreCuenta,
                        avatar: usuario?.avatar,
                        _id: _id
                    }
                })
            } else {
                dispatch({
                    type: UNLIKE_POST, payload: {
                        _id: _id,
                        nombreCuenta: usuario?.nombreCuenta
                    }
                })
            }

            let endpoint = esLike ? "darLike" : "quitarLike";
            await axios.post(`${process.env.REACT_APP_APIURL}/${endpoint}`, body, header);

        } catch (error) {
            console.log(error)
        }
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
                let leHeDadoLike = post?.usuariosLike?.find((_usuario) => {
                    return _usuario.nombreCuenta === usuario.nombreCuenta
                })

                return <div className="boxPost" >

                    <div className="cabeceraPost">

                        <img className="imgAvatar" src={post?.autor?.avatar}></img>
                        <div>
                            <div className="nick">{post?.autor?.nick}</div>
                            <Link to={`/perfil/${post?.autor?.nombreCuenta}`} className="nCuenta">@{post?.autor?.nombreCuenta}</Link>
                        </div>
                    </div>
                    <div className="mensajePost">{post?.mensaje}</div>

                    <span style={{ fontSize: "0.7em" }}>{moment(post?.fechaCreacion).fromNow()}</span>

                    <span>
                        <Tooltip key="comment-basic-like" title="Like">
                            <span className="cp" onClick={() => pulsaLike(!leHeDadoLike, post?._id)}>
                                {leHeDadoLike ? <LikeFilled /> : <LikeOutlined />}
                            </span>
                        </Tooltip>

                        <Tooltip key="comment-basic-like" title="Personas que han dado like">
                            <span className="cp" onClick={() => setContenidoModal(post?.usuariosLike)} style={{ marginLeft: "0.5em" }}>{post?.usuariosLike?.length} Likes</span>
                        </Tooltip>

                        {/* <span key="comment-basic-reply-to"> Responder</span> */}

                        {post?.autor?._id === usuario?._id && <DeleteOutlined style={{ marginLeft: "0.5em" }} onClick={() => deletePost(post?._id)} />}

                    </span>
                </div>
            })}

            <Modal
                title="Personas que han dado like"
                visible={contenidoModal}
                onCancel={()=>{setContenidoModal(null)}}
                footer={null}
            >
                {contenidoModal?.map(usuarioLike => {
                    return <>
                        <Comment
                            actions={null}
                            author={<a>{usuarioLike?.nick}</a>}
                            avatar={
                                <Avatar
                                    src={usuarioLike?.avatar}
                                />
                            }
                            content={
                                <p>{usuarioLike?.nombreCuenta}</p>
                            }
                        />
                        <Divider style={{margin: 0}} />
                    </>
                })}
            </Modal>
        </div>
    )
};
