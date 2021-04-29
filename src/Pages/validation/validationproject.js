import React, { Component } from 'react';
import { TextField , Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';



const item = {
    description: "",
    price: "",
    heure:""
};  


export default class AddInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [{}],
            prixTotal:0,
            project:{},
            user:{},
            errorMessage:""
        }
    }

    handleChange = idx => async e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = { ...rows[idx] , [name]: value, };
        await this.setStateSync({ rows }).then(e => this.UpdatePrice())   

    };

    getQueryStringValue =  (key) => {  
        return decodeURIComponent(window.location.hash.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*+\#]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    componentDidMount(){
        const token = this.getQueryStringValue("token");
        
        fetch(`http://localhost:3001/api/Project/${token}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then((result) => {
             if (result['status'] === "success"){
                result.project.DateExp = `${new Date(parseInt(result.project.DateExp)).getUTCDate()}/${new Date(parseInt(result.project.DateExp)).getUTCMonth()+1}/${new Date(parseInt(result.project.DateExp)).getFullYear()}`
                result.project.Date = `${new Date(result.project.Date).getUTCDate()}/${new Date(result.project.Date).getUTCMonth()+1}/${new Date(result.project.Date).getFullYear()}`
                this.setState({project : result.project , user : result.user})
            }else{
                this.setState({errorMessage : result.response})
            } 
        })
    }

    

    handleAddRow = () => {
        this.setState({
            rows: this.state.rows.concat(item)
        });
    };

    setStateSync(state){
        return new Promise(resolve=>{
            this.setState(state,resolve)
        })
    }


    Valider(){
        const { user, project , rows  } = this.state
        fetch(`http://localhost:3001/api/createpdf`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body : JSON.stringify(
                {
                    user : user,
                    project : project,
                    data : rows
                }
            )
        }).then(response => response.json())
        .then((result) => {
             if (result['status'] === "success"){
                console.log(result.response)
            }else{
                console.log(result.response)
            } 
        })
    }


    UpdatePrice = () =>{
        var prix = 0
        const {rows} = this.state
        rows.map((elem)=>{
            if(elem.price!=undefined && elem.heure !=undefined){
                prix += elem.price * elem.heure
            }
        })
        this.setStateSync({ prixTotal:prix })   
    }

        render() {
            const {rows , prixTotal , user , project} = this.state
            return (
                <React.Fragment>
                    <P>Création de devis :</P>
                <div>
                    <table style={{border: '1px solid black'}}>
                        <tr style={{border: '1px solid black'}}>
                            <td style={{border: '1px solid black'}}>Client : {user.FirstName} {user.LastName} </td> 
                            <td style={{border: '1px solid black'}}>Entreprise : {user.Compagny}</td>
                            <td style={{border: '1px solid black'}}>Contact : {user.Phone}</td>
                        </tr>
                        <tr  style={{border: '1px solid black'}}>
                            <td style={{border: '1px solid black'}}>Date de création : {project.Date} </td>
                            <td style={{border: '1px solid black'}}> Date de fin souhaité : {project.DateExp}</td>
                        </tr>
                        <td style={{border: '1px solid black'}}>Project : {project.Description}</td>
                    </table>
                </div>
                <TABLE>
                        {rows.map((item, idx) => (
                            <React.Fragment>
                            <TextField style={input} type="text" name="description" label="Description de la tâche" value={item.description} onChange={this.handleChange(idx)} />
                            <TextField style={input} type="number" name="heure" label="Heure estimé" value={item.heure} onChange={this.handleChange(idx)} />    
                            <TextField style={input} type="number" name="price" label="Prix horaire" value={item.price} onChange={this.handleChange(idx)} />
                            </React.Fragment>   
                        ))}   
                        <Fab color="primary" aria-label="add">
                            <AddIcon  onClick={this.handleAddRow} />
                        </Fab>
                        <p>Prix total : {prixTotal}€</p>
                    </TABLE>     
                    <button onClick={this.Valider.bind(this) }>Valider</button>
                    </React.Fragment>              
                )
                
            }
}

const input = {
    margin:"20px",
    width:"30vh",
    marginBottom:"20px"
};

const TABLE = styled.div`
display: grid;
grid-template-columns: repeat(3 , 1fr);
grid-gap: 0.2rem;
margin-right: auto;
margin-left: 20vh;

`;

const P = styled.div`
text-align:center;
font-size:3vh;
`;