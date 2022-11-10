import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardFooter, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { AiOutlineSend } from "react-icons/ai";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat(props) {
    const { socket, username, room } = props
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([{ notif: `${username} joined the room.` }]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const date = new Date(Date.now());
            const message = {
                room: room,
                username: username,
                message: currentMessage,
                timestamp: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }

            await socket.emit('send', message);
            setMessages(prev => [...prev, message]);
            setCurrentMessage('');
        }
    }

    useEffect(() => {
        socket.on('receive', message => {
            setMessages(prev => [...prev, message]);
        })
    }, [socket]);

    return (
        <Container className='p-0'>
            <Card className='rounded-0 max-height'>
                <CardBody className='p-0'>
                    <ScrollToBottom className='scroll'>
                        {messages.map((message, index) => {
                            if (message.notif) {
                                return <small key={index} 
                                        className='d-flex flex-column text-center text-black-50'
                                    >
                                        {message.notif}
                                    </small>
                            } else {
                                return (
                                    <div key={index} 
                                        className='d-flex flex-column mb-3'
                                    >
                                        <div>
                                            <small className={
                                                    message.username === username ? 
                                                    'float-end text-muted' : 
                                                    'float-start text-muted'
                                                    }>
                                                {message.username} - {message.timestamp}
                                            </small>
                                        </div>
                                        <div className='text-light'>
                                            <p className={
                                                message.username === username ? 
                                                'float-end bg-primary p-2 rounded m-0': 
                                                'float-start bg-success p-2 rounded m-0'
                                            }>
                                                {message.message}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </ScrollToBottom>
                </CardBody>
                <CardFooter>
                <InputGroup>
                    <InputGroupText>
                        Room: {room}
                    </InputGroupText>
                    <Input 
                        type='text'
                        value={currentMessage} 
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    />
                    <Button color='primary' onClick={sendMessage}><AiOutlineSend /></Button>
                </InputGroup>
                </CardFooter>
            </Card>
        </Container>
    )
}

export default Chat