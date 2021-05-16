import React, { useState , useLayoutEffect , useEffect , useRef } from "react"
import { useTranslation } from 'react-i18next';
import { Language } from './enum-language';
import { BUTTONEN , BUTTONFR } from './style'


const Lang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language in Language);
    
    useEffect(()=>{
        if(localStorage.getItem('i18nextLng')){
            setLang(localStorage.getItem('i18nextLng'));
        }else{
            setLang(Language.FR)
        }
    },[])

    useLayoutEffect(()=>{
        switch(lang){
            case Language.FR :{
                document.getElementById('BouttonFr').style.backgroundColor='#1976d2'
                document.getElementById('BouttonFr').style.color='white'
                document.getElementById('BouttonEn').style.backgroundColor=''
                document.getElementById('BouttonEn').style.color='black'
                break;
            }
            case Language.EN :{
                document.getElementById('BouttonEn').style.backgroundColor='#1976d2'
                document.getElementById('BouttonEn').style.color='white'
                document.getElementById('BouttonFr').style.backgroundColor=''
                document.getElementById('BouttonFr').style.color='black'
                break;
            }
        }
    },[lang])

    const changeLang = (elem) =>{
        switch(elem){
            case Language.FR :{
                setLang(Language.FR)
                i18n.changeLanguage(Language.FR);
                break;
            }
            case Language.EN :{
                setLang(Language.EN)
                i18n.changeLanguage(Language.EN);
                break;
            }
        }
    }

 
    return (
        <React.Fragment>
            <BUTTONEN id='BouttonEn' onClick={() => changeLang('en')}>EN</BUTTONEN>
            <BUTTONFR id='BouttonFr' onClick={() => changeLang('fr')}>FR</BUTTONFR>
        </React.Fragment>
    )
}
 
export default Lang;