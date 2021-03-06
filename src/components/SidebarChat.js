import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import { Link } from "react-router-dom";
import "../assets/SidebarChat.css";

function SidebarChat({ addNewChat, name, id}) {


    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db.collection(`rooms/${id}/messages`)
        .orderBy('timestamp','desc')
        .onSnapshot(snap => {
            setMessages(snap.docs.map(message => message.data()))
        })
    }, [])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])


    const createChat = () => {
        const roomName = prompt("Please enter name of the new Chat");
        if (roomName) {
            db.collection("rooms").add({
                name: roomName
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>

        </Link>
    ) :
        (
            <div className="sidebarChat" onClick={createChat}>
                <h2>Add New Channel</h2>
            </div>
        )
}

export default SidebarChat
