import React from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'; 

function JoinRoom(props) {
    const { username, setUsername, setRoom, joinRoom } = props;
    
    return (
        <Container className='ms-auto mt-5 min-width'>
            <Form className='p-5'>
                <h1 className='text-center'>Join a Chat Room</h1>
                <FormGroup className='mt-5' floating>
                    <Input
                        id="username"
                        value={username}
                        placeholder="Username"
                        type="text"
                        onChange={setUsername}
                    />
                    <Label for="username">Username</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="room"
                        placeholder="Room"
                        type="text"
                        onChange={setRoom}
                    />
                    <Label for="room">Room</Label>
                </FormGroup>
                <Button 
                    block={true} 
                    size='lg'
                    color='success'
                    onClick={joinRoom}
                >
                    Join
                </Button>
            </Form>
        </Container>
    )
}

export default JoinRoom