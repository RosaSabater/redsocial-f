import React, { useState } from 'react';
import AccesosDirectos from '../../Components/AccesosDirectos/AccesosDirectos';
import Perfil from '../../Components/Perfil/Perfil';
import Postear from '../../Components/Postear/Postear';
import Posts from '../../Components/Posts/Posts';
import './Layout.scss'

const Layout = ({children, muestraCabecera = true}) => {

    return (
        <div className="homepage">
            <AccesosDirectos />

            <div className="homepageColumn">
                {muestraCabecera && <Postear />}
                {children}
            </div>
        </div>
    )
}

export default Layout;
