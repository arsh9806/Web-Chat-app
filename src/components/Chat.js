import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicIcon from "@material-ui/icons/Mic";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../assets/Chat.css";

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    function sendMessage(e) {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at</p>
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
                <p className={`chat__message ${
              true && "chat__reciever"
            }`}> 
                <span className="chat__name">Arsh</span>
                Hello you
                <span className="chat__timestamp">5:45</span>
                </p>
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