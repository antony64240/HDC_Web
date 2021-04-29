import React, {useState, useEffect} from 'react';
import EmailValidator from 'email-validator';
import { TextField , Button } from '@material-ui/core';
import {TABLE, CONTAINER , ROW , COLUMN , TextTitle , P  } from './style'
import { useTranslation } from "react-i18next";
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import StickyHeadTable from './tablerow';

const Project = (props) => {
    const { t } = useTranslation();

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('User'));
        fetch(`${CONFIG.URLAPI}getProject/${user.email}`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then(response => {
            setProjects(response.project.Project)
        });    
    },[])




    // useEffect(()=>{
    //     setEmail(localStorage.getItem('Email'));
    //     if(localStorage.getItem('firstname') !== 'undefined'){
    //         setFirstname(localStorage.getItem('firstname'));
    //     }
    // },[])

    


    return(
        <div style={props.opacityProject ? enable : disable}>
            <CONTAINER>
                <StickyHeadTable rows={projects}/>
            </CONTAINER>
        </div>
    )

}
export default Project;


const enable = {
    opacity : "1",
    transitionDuration : "0.7s",
    position: 'relative',
    width:'100%',
    height:'400%',
    padding: '2rem 3rem',
    borderTop: '1rem solid'

};


const disable = {
    position:'fixed',
    right:'-100rem',
    opacity :  "0",
    transitionDuration : "0.7s",
    height : '0'
};

const input = {
    margin:"20px",
    width:"30vh",
    marginBottom:"20px"
};

