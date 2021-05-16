import React, { useEffect, useState , useContext } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './todo.css';
import projectData from "../../../Context/projectData";
import { CONFIG }  from '../../enum-list/enum-list';
import ObjectID from 'bson-objectid';

function TodoList({ data , dataSelected }) {
  const [todosLeft, setTodosLeft] = useState([]);
  const [todosRight, setTodosRight] = useState([]);
  const { dataProject , setDataProject } = useContext(projectData);

  useEffect(() =>{
    data.map( item =>{
      if(item._id == dataSelected){
        if(item.Todo.length !== 0){
          item.Todo.map(todo =>{
            if(todo.State){
              setTodosRight(oldArray => [...oldArray , todo])
            }else{
              setTodosLeft(oldArray => [...oldArray , todo])
            }
          })
        }
      }
    })

  },[])

  const addTodo = (todo) => {
    fetch(`${CONFIG.URLAPI}Todo`, {
      method: "POST",
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          token : localStorage.getItem('token'),
          id :  dataSelected
      },
      body: JSON.stringify(
        {
          todo :  todo
        }
    ),
    })
    .then(response => response.json())
    .then(result =>{
      if(result.status === "error"){
        removeTodoSync(todo._id)
        setTodosRight(todosRight)
        setTodosLeft(todosLeft)
      }
    })
  }


  const removeTodo = (id) => {
    fetch(`${CONFIG.URLAPI}Todo`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          token : localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          id :  id
        }
    ),
    })
  }

  const updateData = (id , todo) => {
     let i = 0;
     for(let data of dataProject){
       if(data._id === dataSelected){
         break;
       }
       i++
     }
     let j = 0;
     for(let data of dataProject[i].Todo){
       if(data._id == id){
        break;
       }
       j++;
     }
     const newRow = {...dataProject[i].Todo[j], Description : todo.Description , Duree : todo.Duree };
     dataProject[i].Todo[j] = newRow;
    }

  const updateTodo = ( id, todo ) => {
    fetch(`${CONFIG.URLAPI}Todo`, {
      method: "PUT",
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          token : localStorage.getItem('token'),
          id : id
      },
      body: JSON.stringify(
        {
          todo :  todo
        }
    ),
    })
  }

  const addTodoRight = todo => {
    todo._id = new ObjectID.createFromTime(new Date().getTime());
    todo.Date = new Date().getTime();
    todo.State = true;
    const newTodos = [todo, ...todosRight];
    setTodosRight(newTodos);
    addTodo(todo);
    let i = 0;
     for(let data of dataProject){
       if(data._id === dataSelected){
         break;
       }
       i++
     }
     dataProject[i].Todo = [ ...dataProject[i].Todo , todo];
  };

  const addTodoLeft = todo => {
    todo._id = new ObjectID.createFromTime(new Date().getTime());
    todo.Date = new Date().getTime();
    todo.State = false;
    const newTodos = [todo, ...todosLeft];
    setTodosLeft(newTodos);
    addTodo(todo);
    let i = 0;
     for(let data of dataProject){
       if(data._id === dataSelected){
         break;
       }
       i++
     }
     dataProject[i].Todo = [ ...dataProject[i].Todo , todo];
  };

  const updateTodoRight = (todoId, newValue) => {
    setTodosRight(prev => prev.map(item => (item._id === todoId ? newValue : item)));
    updateTodo(todoId, newValue);
    updateData(todoId, newValue)
  };

  const updateTodoLeft = (todoId, newValue) => {
    setTodosLeft(prev => prev.map(item => (item._id === todoId ? newValue : item)));
    updateTodo(todoId, newValue);
    updateData(todoId, newValue)
  };


  const removeTodoLeft = id => {
    const removedArr = [...todosLeft].filter(todo => todo._id !== id);
    setTodosLeft(removedArr);
    removeTodo(id);
    removeTodoSync(id);
  };

  const removeTodoRight = id => {
    const removedArr = [...todosRight].filter(todo => todo._id !== id);
    setTodosRight(removedArr);
    removeTodo(id)
    removeTodoSync(id);
  };

  const removeTodoSync = (id) =>{
    let i = 0;
    for(let data of dataProject){
      if(data._id === dataSelected){
        break;
      }
      i++
    }
  let j = 0;
  for(let data of dataProject[i].Todo){
     if(data._id == id){
      break;
     }
     j++;
  }
  dataProject[i].Todo.splice(j,1);
  }


  return (
    <React.Fragment>
      <h1 className='textTodo' >Suivis du projet :</h1>
      <div className='gridTodo'>
      
        <div>
        <h1 className='text-tache' >Tâche en cours :</h1>
          <TodoForm onSubmit={addTodoLeft} />
          <Todo side={"left"}
            todos={todosLeft}
            removeTodo={removeTodoLeft}
            updateTodo={updateTodoLeft}
          />
        </div>
        <div>
          <h1 className='text-tache' >Tâche finis :</h1>
          <TodoForm onSubmit={addTodoRight} />
          <Todo side={"right"}
            todos={todosRight}
            removeTodo={removeTodoRight}
            updateTodo={updateTodoRight}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TodoList;
