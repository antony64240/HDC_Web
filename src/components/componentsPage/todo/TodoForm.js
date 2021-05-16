import React, { useState, useEffect, useRef } from 'react';
const regNumber=/^[0-9]{0,9999}$/;

function TodoForm(props) {
  const [input, setInput] = useState({});


  const handleChange = e => {
      setInput({ ...input , [e.target.name]:e.target.value});
  };

  useEffect(()=>{
    if(input.Duree){
        if(input.Duree.match(regNumber)===null)
            {
              setInput({ ...input, Duree :input.Duree.substr(input.Duree.length)})
           }
            else{
                if(input.Duree.match(regNumber)===null){
                  setInput({ ...input, Duree : input.Duree.substr(0,input.Duree.length-1)})
                }}   
    }
    },[input.Duree]);

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      Description: input.Description,
      Duree: input.Duree
    });
    setInput({Duree : '' , Description : ''});
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Ajouter une tâche'
            value={input.Description}
            onChange={handleChange}
            name='Description'
            className='todo-input'
          />
          <input
            placeholder='Durée'
            value={input.Duree}
            onChange={handleChange}
            name='Duree'
            className='todo-input-temps'

          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Modifier
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Ajouter une tâche'
            value={input.Description}
            onChange={handleChange}
            name='Description'
            className='todo-input'
          />
          <input
            placeholder='Durée'
            value={input.Duree}
            onChange={handleChange}
            name='Duree'
            className='todo-input-temps'

          />
          <button onClick={handleSubmit} className='todo-button'>
            Ajouter
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
