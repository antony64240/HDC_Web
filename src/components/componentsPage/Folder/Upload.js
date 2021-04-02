import React, {Component} from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }
    }
    checkMimeType = (event) => { // getting file object
        let files = event.target.files
        let err = []
        const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf','application/x-zip-compressed','application/x-gzip']


        for (var x = 0; x < files.length; x++) {
            console.log(files[x].type);
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) { // create error message and assign to container
                err[x] = files[x].type + ' Le format n\'est pas supporté.\n Format supporté: PNG,JPG,PDF,ZIP';
            }
        };
        for (var z = 0; z < err.length; z++) {
            // if message not same old that mean has error
            // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    maxSelectFile = (event) => {
        let files = event.target.files
            if (files.length > 5) {
                const msg = 'Juste 5 fichier peuvent être upload en même temps !'
                event.target.value = null
                toast.warn(msg)
                return false;
            }
        return true;
    }
    checkFileSize = (event) => {
        let files = event.target.files
        let size = 20000000
        let err = [];

            for (var x = 0; x < files.length; x++) {
                if (files[x].size > size) {
                    err[x] = files[x].type + 'Le fichier est trop large, chosissez-en un plus petit s\'il vous plaît\n';
                }
            };
            for (var z = 0; z < err.length; z++) {
                // if message not same old that mean has error
                // discard selected file
                toast.error(err[z])
                event.target.value = null
            }
            return true;
        
    }

    onChangeHandler = event => {
        var files = event.target.files
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) { // if return true allow to setState
            this.setState({selectedFile: files, loaded: 0})
        }
    }
    onClickHandler = () => {
        var url = document.getElementById("currentUrl").textContent;
        url = url.substr(19);
        const data = new FormData();
        if(this.state.selectedFile==null){
            const msg = 'Aucun fichier sélectionné.'
            toast.warn(msg)
        }else{
            for (var x = 0; x < this.state.selectedFile.length; x++) {
                data.append('file', this.state.selectedFile[x]);
            }
            axios.post("http://localhost:3001/api/UploadFile"+"?CurrentValue="+url+"&username="+localStorage.getItem('username'),
                data
            ,{
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
                    })
                }
            }).then(res => { // then print response status
                toast.success('upload success');
                this.props.data[1](this.props.data[0]+this.state.selectedFile.length);
                
            }).catch(err => { // then print response status
                toast.error('upload fail')
            })
        }
    }

    render() {
       
        
        return( 
            <div style={{position:'fixed',bottom:'200px'}}> 
              <div >
                <label>Upload Your File </label>
                <input type="file"  multiple onChange={this.onChangeHandler}/>
              </div>  
              <div >
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
              </div> 
              <button type="button"  onClick={this.onClickHandler}>Upload</button>
            </div>
      );
    }
}

export default Upload;
