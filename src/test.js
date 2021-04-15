import React,{useState} from 'react';

export function FormSelect(){

 const [name,setName] = useState('');

 function handleNameChange(e){
      setName(e.target.value)
 }

 function handleSubmit(e){
   e.preventDefault() // stops default reloading behaviour
     console.log(name);
 }

    return (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name}
           onChange={handleNameChange}/>
          <button>Submit</button>
       </form>
    )
}