import React from 'react';
import AccesosDirectos from '../../Components/AccesosDirectos/AccesosDirectos';
import Postear from '../../Components/Postear/Postear';
import './Layout.scss'
import Buscador from '../Buscador/Buscador';
import Noticias from '../Noticias/Noticias';

const Layout = ({ children, muestraCabecera = true }) => {

    return (
        <div className="homepage">
            <div className="div">
                <AccesosDirectos />

                <div className="homepageColumn">
                    {muestraCabecera && <Postear />}
                    {children}
                </div>

                <Buscador />
                {/* <Noticias /> */}

            </div>
        </div>
    )
}

export default Layout;
