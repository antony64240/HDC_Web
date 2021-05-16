import { toast } from 'react-toastify';

export const checkMimeType = (event) => { // getting file object
    let files = event.target.files;
    let err = [];
    const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf','application/x-zip-compressed','application/x-gzip']


    for (var x = 0; x < files.length; x++) {
        if (types.every(type => files[x].type !== type)) { 
            console.log(files[x].name)
            err[x] = files[x].type + ' Le format n\'est pas supporté.\n Format supporté: PNG,JPG,PDF,ZIP';
        }
    };
    for (var z = 0; z < err.length; z++) {
        toast.error(err[z]);
        event.target.value = null;
    }
    return true;
}


export const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 20000000;
    let err = [];

        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + `Le fichier est trop large, chosissez-en un plus petit s'il vous plaît`;
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    
}

export const maxSelectFile = (event) => {
    let files = event.target.files
        if (files.length > 5) {
            const msg = 'Juste 5 fichier peuvent être upload en même temps !'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
    return true;
}