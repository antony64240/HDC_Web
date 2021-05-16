import React, {useState, useEffect} from 'react';
import ProductIcon from './ProductList';
import './files.css';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import { checkMimeType , checkFileSize , maxSelectFile } from "../../../services/files";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const ListFolder = ({ setfilesLoad , files , filesLoad , currentFolder }) => {

    const [isOpen , setisOpen] = useState(Boolean);
    const [openDialog , setopenDialog] = useState(Boolean);
    const [selectedFile, setselectedFile] = useState();
    const [loaded, setloaded] = useState(Number);
    const [anchorEl, setAnchorEl] = React.useState(null);



    useEffect(()=>{
        if(filesLoad){
            setisOpen(true)
        }
    },[filesLoad])

    const closeTab = () => {
        setisOpen(false)
        setfilesLoad(false)
    }

    const openDial = () => {
        setopenDialog(true)
    }
    const closeDial = () =>{
        setopenDialog(false)
    }

    const onChangeHandler = event => {
        var files = event.target.files
        if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) { // if return true allow to setState
            setselectedFile(files)
        }
        event.target.files = null;
    }
    
    const onClickHandler = () => {
        const data = new FormData();
        if(selectedFile==null){
            const msg = 'Aucun fichier sélectionné.'
            toast.warn(msg)
        }else{
            for (var x = 0; x < selectedFile.length; x++) {
                data.append('file', selectedFile[x]);
            }
            axios.post(`${CONFIG.URLAPI}UploadFile?url=Currenturl=${currentFolder}?token=${localStorage.getItem("token")}`,
            data
            ,{
                onUploadProgress: ProgressEvent => {
                    setloaded(ProgressEvent.loaded / ProgressEvent.total * 100)                
                }
            })
            .then(res => {
                toast.success('upload success');
                setfilesLoad(false)
                setopenDialog(false)
                setisOpen(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }


    const download = (name, extension) => {
        if(name && extension){
            fetch(`${CONFIG.URLAPI}Download`,{
                method:"GET",
                headers: {
                    name : `${name}${extension}`,
                    url : currentFolder,
                    token:localStorage.getItem('token')
                }
            }
            ).then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${name}${extension}`;
                a.click();
            });
          })  
        }else{
            fetch(`${CONFIG.URLAPI}Download`,{
                method:"GET",
                headers: {
                    name : anchorEl.lastChild.innerHTML,
                    url : currentFolder,
                    token:localStorage.getItem('token')
                }
            }
            ).then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = anchorEl.lastChild.innerHTML;
                a.click();
                handleClose();
            });
          })  
        }           
    }

    const deletefile = () => {
            fetch(`${CONFIG.URLAPI}ListFichier`,{
                method:"DELETE",
                headers: {
                    name : anchorEl.lastChild.innerHTML,
                    url : currentFolder,
                    token:localStorage.getItem('token')
                }
            }
            ).then(response => response.json())
            .then( result =>{
                if(result.status == "success"){
                    toast.success('delete success');
                    setfilesLoad(false);
                    setopenDialog(false);
                    setisOpen(false);
                    handleClose();
                }
            })    
    }


    
    const handleClose = () => {
        setAnchorEl(null);
  
        };

    const ClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    



    if(files){
        var content = files.map((data) => 
            <div key={data._id}>
                <ProductIcon onClick={ClickMenu}  data={data}/>
                
                <Menu
                    id={`simple-menu${data._id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                        <MenuItem onClick={()=>download()}>Télécharger</MenuItem>
                        <MenuItem onClick={()=>deletefile()}>Supprimer</MenuItem>
                </Menu>
                
            </div>
        );
    }
    return(
        <div className={isOpen ? 'SectionFiles-active' : 'SectionFiles'} >
            <ToastContainer />
            <Dialog open={openDialog}   aria-labelledby="form-dialog-title">
                <input type="file" multiple onChange={onChangeHandler}/>
                        <Progress
                        width={50}
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={loaded.toFixed(2)}
                    />
                            <DialogActions>
                            <Button onClick={() => closeDial()}  color="primary">
                                Annuler
                            </Button>
                            <Button onClick={() => onClickHandler()}  color="primary">
                                Télécharger
                            </Button>
                        </DialogActions>
                    </Dialog>  
            <ArrowForwardIosIcon className='closeTab' onClick={() => closeTab()}/>
            <AddRoundedIcon className='addFiles' onClick={() => openDial()}/>
                <div className='containerBoxFile'>
                    {content}
                </div>
        </div>
    );
}
export default ListFolder;
