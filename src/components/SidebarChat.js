import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "../assets/SidebarChat.css";

function SidebarChat({ addNewChat }) {


    const [seed, setSeed] = useState('');


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])


    const createChat = () => {
        const roomName = prompt("Please enter name of the new Chat");
        if (roomName) {
        //   db.collection("rooms").add({
        //     name: roomName,
        //   });
        }
      };

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>Name</h2>
                <p>My message</p>
            </div>
        </div>
    ) :
        (
            <div className="sidebarChat" onClick={createChat}>
                <h2>Add New Channel</h2>
            </div>
        )
}

export default SidebarChat
