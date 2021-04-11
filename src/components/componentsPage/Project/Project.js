import React from 'react';



const Projects = (props) => {


    const enable = {
        opacity : "1",
        transitionDuration : "0.7s",
        position: 'fixed',
        right: '20rem',
        left: '20rem',
        top: '10rem',
        bottom: '10rem',
        borderRadius: '30px',
        padding: '2rem 3rem',
        boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)'
    };
    const disable = {
        position:'fixed',
        top:'-100rem',
        left: '20rem',
        right:'20rem',
        opacity :  "0",
        transitionDuration : "0.7s",
        height : '0'
    };
    
    return(
        <div style={props.opacityProject ? enable : disable}>
                <p style={pstyle}>Vos données personnelles seront traitées de façon strictement confidentielle et ne seront en aucun cas transmises à des tiers.</p>  
                <div style ={baseStyle}>Descriptif du projet à réaliser:
                    <div>
                        <textarea style={Field} id="textarea" />
                    </div>
                </div>
                <div style ={baseStyle}>Délais de livraison:<input></input></div>
                <p style={pstyle}></p>Merci de bien importer un fichier .Zip contenant les élèments nécessaires à l'études de votre projet.
                <p style={pstyle}>Votre projet sera étudié dans un délai de 48 heures après dépôts de celui-ci. Un devis vous sera envoyé à l'adresse suivante : "" 
                après études de projet et capacité de livraison. Vous pourrez retrouver dans votre espace client vos fichiers déposer ainsi que le devis.
                Dans le cas d'un possible accord, vous allez aussi pouvoir suivre l'état d'avancement sur ce même dépôt en ligne.</p>
        </div>
    )
}
export default Projects;


const baseStyle = {
};


const pstyle = {
    color:'black',
    cursor : 'default',
};



const Field = {
    width:"100%",
    height:"10vh",
    resize: 'none'
};