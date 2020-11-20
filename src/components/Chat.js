import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicIcon from "@material-ui/icons/Mic";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../firebase";
import { useParams } from "react-router-dom";
import "../assets/Chat.css";
import { useDataLayerValue } from '../StateManagement/StateProvider';
import firebase from "firebase";

function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [{ user }, dispatch] = useDataLayerValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snap => {
                setRoomName(snap.data().name)
            });
            db.collection(`rooms/${roomId}/messages`).orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                });
        }

    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])


    function sendMessage(e) {
        e.preventDefault();
        db.collection(`rooms/${roomId}/messages`)
            .add({
                name: user.displayName,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(res => {
                
            }).catch(err => {
                alert(err.message)
            })
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Active {messages[messages.length - 1] ? new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() : '-'}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    messages.map((message, index) => (
                        <p key={index} className={`chat__message ${message.name === user.displayName && "chat__reciever"
                            }`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                    ))
                }
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a Message
          </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
