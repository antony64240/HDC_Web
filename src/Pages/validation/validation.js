import React from "react";


class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "En cours de validation"
        }       
    }


    componentDidMount(){
        this.requestValidation()
    }
    
    getQueryStringValue (key) {  
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  


    requestValidation(){
        const token = this.getQueryStringValue("token"); 
        console.log(token)
        fetch(`http://localhost:3001/api/verifyEmail/${token}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then((result) => {
             if (result['status'] === "success"){
                console.log("success")
                this.setState({message:result.response})
                setTimeout(()=>{ window.location.href ='/Login'; },3000)
               
            }else{
                this.setState({message:result.response})
                setTimeout(()=>{ window.location.href ='/Login'; },3000)
            } 
        })
    }
    render() {
        return(
            <div>
                {this.state.message}
            </div>
        )
    }
}

export default VerifyEmail