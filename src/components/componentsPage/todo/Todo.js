import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


const Todo = ({ todos, removeTodo, updateTodo , side }) => {
  const [edit, setEdit] = useState({
    Description: '',
    _id:'',
    Duree:''
  });

  const submitUpdate = value => {
    updateTodo(edit._id, value);
    setEdit({
      _id:'',
      Description: '',
      Duree: ''
    });
  };



  return todos.map((todo, index) => {
    if(edit._id == todo._id){
      return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }else{  return (
    <div
      className={'todo-row'}
      key={index}
    >
      <div key={todo._id}>
        tâche : {todo.Description} <br/>
        {(side === "left" ) ? "durée estimé :" : "durée totale :"} {todo.Duree}h
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ _id: todo._id, Description: todo.Description , Duree : todo.Duree })}
          className='edit-icon'
        />
      </div>
    </div>
    )}
  
  }
    
  )

};

export default Todo;
