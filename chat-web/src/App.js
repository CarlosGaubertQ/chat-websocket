import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import './app.css'
import Button from "@material-ui/core/Button";

const socket = io.connect('http://localhost:3000')

function App() {
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])


  useEffect(() =>{
    socket.on('message', ({name, message}) =>{
      setChat([...chat, {name, message}])
    })
  })

  const onTextChange = e =>{
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = e=>{
    e.preventDefault()
    const {name, message} = state
    socket.emit('message', {name , message})
    setState({message: '', name})
  }

  const renderChat = ()=>{
    return chat.map(({name,message},index) => (
      <div key={index}>
        <h3>{name}: <span>{message}</span></h3>
      </div>
    ))
  }


  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Mensajero</h1>
        <div className="name-field">
          <TextField 
            name="name" 
            onChange={e => onTextChange(e)} 
            value={state.name} />
        </div>
        <div>
          <TextField 
            name="message" 
            onChange={e => onTextChange(e)} 
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined" 
            label="Mensaje"/>
        </div>
        <Button type="submit"  variant="contained" color="primary">
          Enviar mensaje  
        </Button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}

      </div>
    </div>
  );
}

export default App;
