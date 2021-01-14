import React from 'react';
import AccesosDirectos from '../../Components/AccesosDirectos/AccesosDirectos';
import Postear from '../../Components/Postear/Postear';
import './Layout.scss'
import Buscador from '../Buscador/Buscador';

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

            </div>
        </div>
    )
}

export default Layout;
