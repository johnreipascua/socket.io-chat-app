import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import Navigation from './Components/Navigation';
import JoinRoom from './Components/JoinRoom';
import Chat from './Components/Chat';
import { Container } from 'reactstrap';
import BounceLoader from "react-spinners/BounceLoader";

const server = process.env.REACT_APP_SERVER || 'http://localhost:5000';
const socket = io(server, { transports: ['websocket', 'polling', 'flashsocket'] });

function App() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(true);

    socket.on("connect_error", () => {
        console.log('reconnecting')
    });

    socket.on("connect", () => {
        setLoading(false);
    });

    socket.on("disconnect", () => {
        setLoading(true);
    });

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('join', { username, room });
            setJoined(true);
        }
    }

    const leaveRoom = () => {
        setJoined(false);
        socket.emit('leave', { username, room });
        setRoom('');
    }

    return (
        <>  {loading ? 
                <div className='loading'>
                    <BounceLoader
                        color={'#36d7b7'}
                        loading={loading}
                        size={80}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /><br/>Connecting to server...
                </div>
                :
                <>
                <Navigation joined={joined} setJoined={leaveRoom}/>
                <Container fluid={true} className='p-0'>
                    {!joined ?
                    <JoinRoom
                        username={username}
                        setUsername={e => setUsername(e.target.value)} 
                        setRoom={e => setRoom(e.target.value)} 
                        joinRoom={joinRoom}
                    /> :
                    <Chat 
                        socket={socket}
                        username={username}
                        room={room}
                    />
                    }
                </Container>
                </>
            }
        </>
    );
}

export default App;
