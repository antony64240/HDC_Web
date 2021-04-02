import React from 'react';

function List(props) {

    var styleSELECT = props.styleSELECT;
    var optionStyle = props.optionStyle;
    var list = props.list;
    var setCity=props.setCity;
    return (
        <select style={styleSELECT} name="Adresse" onChange={(e) => setCity(e.target.value)} >
            {
            list.map((item) => {

                return <option style={optionStyle} value={item.nom} > {item.nom} </option>
            })
        }
         </select>
    )
}



export default List