import { io } from "socket.io-client";
import './App.css'

function App() {
  const socket = io("http://localhost:3001", { autoConnect: false });
  socket.connect();

  return (
    <>TalkTime App</>
  )
}

export default App
