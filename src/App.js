
import './App.css';
import { useEffect, useRef,  useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect (() => {
  fetch('http://localhost:4000/users')
  .then(res => res.json())
  .then(data => setUsers(data));

  },[])

  const handleAddUser = e =>{
 // console.log(nameRef.current.value);
     const name = nameRef.current.value;
    const gmail = emailRef.current.value;

    const newUser = {gmail: gmail,name: name }

    //send data to the server
    fetch('http://localhost:4000/users', {
      method:'post',
      headers: {
        'content-type':'application/json',
        
      }, 
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
       const addedUsers = data;
       const newUsers = [...users, addedUsers];
       setUsers(newUsers);
    })

    
    nameRef.current.value='';
    emailRef.current.value='';


    e.preventDefault();
  }


  return (
    <div className="App">
      <h2>Found Users: {users.length}</h2>

      <form onSubmit={handleAddUser} >
        
            <input type="text" ref={nameRef} placeholder="name" />

            <input type="email" ref={emailRef} placeholder="email" />
            <input type="submit" value="Submit" />
      </form>
     
     
     <ul>
       
       {
         users.map(user => <li key={user.id}>ID-{user.id}: {user.name} and Mail:  {user.gmail}</li>)
       }
     </ul>
    </div>
  );
}

export default App;
