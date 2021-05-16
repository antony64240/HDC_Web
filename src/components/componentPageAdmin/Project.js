import React, {useState, useEffect , useContext} from 'react';
import { CONTAINER } from './style'
import StickyHeadTable from './tablerow';
import projectData from "../../Context/projectData";


const Project = (props) => {


    const { dataProject , setDataProject } = useContext(projectData);

    return(
        <div style={props.opacityProject ? enable : disable}>
            <CONTAINER>
                <StickyHeadTable rows={dataProject}/>
            </CONTAINER>
        </div>
    )

}
export default Project;


const enable = {
    opacity : "1",
    transitionDuration : "0.7s",
    position: 'absolute',
    width:'100%',
    top:'60px',
    padding: '2rem 3rem',
    borderTop: '1rem solid',
    zIndex : '1000'
};


const disable = {
    position:'fixed',
    top:'-100%',
    width:'100%,',
    opacity :  "0",
    transitionDuration : "0.7s",
    zIndex : '1000'
};

const input = {
    margin:"20px",
    width:"30vh",
    marginBottom:"20px"
};

