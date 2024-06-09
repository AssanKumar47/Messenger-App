import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chat from "./components/Chat"
import './App.css'
import io from "socket.io-client"

const socket = io.connect('http://localhost:3000')

function App() {
  
  const[username,setusername] = useState()
  const[room,setroom] = useState()
  const[join,setjoin] = useState(false)

  const joinRoom = () => {
    if(username !=='' && room !== ''){
      socket.emit('join_room',room)
      setjoin(true)
    } 
  }

  return (
    <>

    <h1 style={{marginTop:"70px",marginLeft:"65px"}}>Messenger App</h1>
    <input  type="text" placeholder='Username' onChange={(event) => setusername(event.target.value)}/>
    <input style={{marginLeft:"25px"}} type="text" placeholder='Join Room' onChange={(event) => setroom(event.target.value)} />
    <button style={{marginLeft:"20px"}} onClick={joinRoom}>Join</button>

    {join && <Chat socket={socket} username={username} roomId={room}/>}
    </>
  )
}

export default App
