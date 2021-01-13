import axios from 'axios';
import React from 'react';
import './Noticias.scss';

const resultados = {
    "eventos": [
        {
            "titulo": "¡Fiesta de inauguración - Diamond Dark Nightclub!",
            "descripcion": "Fiesta de inauguración de Diamond Dark Nightclub patrocinada por Stronzo - Localización: Vinewood Oeste. Precio de la entrada $300",
            "fecha_evento": "2019-07-03 23:00:00",
            "imagen": "4bdcfd565fd7bc817075004bb610199e.png",
            "realizado": 1
        },
        {
            "titulo": "¡Fiesta de la espuma en Diamond Dark Nightclub!",
            "descripcion": ". El valor de la entrada es de $300 pero si traes una prenda rosa tendrás un descuento. ¡Cervezas gratis toda la noche!",
            "fecha_evento": "2019-07-06 01:00:00",
            "imagen": "190e59ccbaaa83ed26ee2f7481760919.png",
            "realizado": 1
        },
        {
            "titulo": "Inauguración Cypress Flats Nightclub",
            "descripcion": "¡Gran inauguración del nuevo local de la ciudad! Se realizaran varios eventos en la fiesta!!!! Habrá club de la lucha y carreras!!!",
            "fecha_evento": "2019-07-05 23:00:00",
            "imagen": "76243de8bbcd277cfa369d5429ab663f.png",
            "realizado": 1
        },
        {
            "titulo": "¡Segunda Fiesta En Cypress Flats!",
            "descripcion": "Segunda Gran Fiesta en el Cypress Flats! Están todos invitados. Vengan a pasarlo como nunca antes",
            "fecha_evento": "2019-07-10 21:00:00",
            "imagen": "bb7985e2913390c6b133f7ba59f2a596.png",
            "realizado": 1
        },
        {
            "titulo": "[DIAMOND DARK NIGHTCLUB] ¡White Party!",
            "descripcion": "Te invitamos a venir a disfrutar de otra de nuestras fiestas temáticas. ¡Esta vez te tocará usar blanco! ¡Te esperamos!",
            "fecha_evento": "2019-07-10 23:00:00",
            "imagen": "f971120379abc66ea3a75da40e10ebb5.png",
            "realizado": 1
        },
        {
            "titulo": "¡Reapertura del Bahama West Mamas!",
            "descripcion": "Bahama West Mamas vuelve a abrir sus puertas este domingo con una fiesta en la que se realizará el sorteo de un Brioso. ¡No te lo pierdas!",
            "fecha_evento": "2019-07-14 22:00:00",
            "imagen": "e6667fb4e4639b106c381a180ea5bb38.png",
            "realizado": 1
        }
    ]
};

const Noticias = () => {

    // resultados.eventos.map((resultado)=>
    // console.log(resultado.titulo))

    return (
        <p>hola</p>
    )
}

export default Noticias;