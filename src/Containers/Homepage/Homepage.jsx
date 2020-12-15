import React from 'react';
import AccesosDirectos from '../../Components/AccesosDirectos/AccesosDirectos';
import Posts from '../../Components/Posts/Posts';
import './Homepage.scss';

const Homepage = () => {

    return (
        <div className="homepage">
            <AccesosDirectos />
            <Posts />
        </div>
    )
}

export default Homepage;
