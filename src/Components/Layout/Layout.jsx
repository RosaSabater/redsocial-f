import React from 'react';
import AccesosDirectos from '../../Components/AccesosDirectos/AccesosDirectos';
import Postear from '../../Components/Postear/Postear';
import Noticias from '../../Components/Noticias/Noticias';
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
