import { Grid, Container, Button, TextField, Avatar} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from '..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase';


function Chat() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");    
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy("createdAt")
    );

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setValue("");
    };
    if (loading) {
        return <Loader />;
      }
    return (
        <Container>
            <Grid 
            container 
            style={{ height: window.innerHeight - 50, marginTop: 7}} 
            justify={"center"}
            >
                <div style = {{
                    width: "80%", 
                    height: "75vh", 
                    border: "1px solid gray",
                    overflowX: "auto",
                    background: "linear-gradient(45deg, #eeecec, #ee790b)",
                    }}
                >
                    {messages.map(message => 
                    <div style = {{
                        margin: 10, 
                        backgroundColor: 
                        user.uid === message.uid
                        ? "rgba(55,255,255,0.7)"
                        : "rgba(228,83,167,0.55)",
                        marginLeft:user.uid === message.uid ? "auto" : "10px",
                        width: "30%",
                        padding: 5,
                        borderRadius: "7px",
                    }}>
                        <Grid container
                        style = {{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center"
                            }}>
                            <Avatar src = {message.photoURL}/>
                            <div>{message.displayName}</div>
                        </Grid>
                        <div>{message.text}</div>
                    </div>
                    )}
                </div>
                <Grid 
                container 
                direction = {'column'} 
                alignItems = {'flex-end'} 
                style ={{width: "80%"}}
                >
                    <TextField 
                    maxRows = {2} 
                    placeholder = "Messege" 
                    fullWidth
                    variant = {"outlined"} 
                    value = {value}
                    style = {{ background:"white", borderRadius: "7px",}}
                    onChange = {(e) => setValue(e.target.value)} 
                     />
                    <Button 
                    variant = {"outlined"} 
                    style = {{ background:"blue", color: "white", marginTop: 5}}
                    onClick = {sendMessage}
                    >
                        Send Message
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;