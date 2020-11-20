import React,{ useEffect, useState }  from 'react';
import { useHistory } from "react-router-dom";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../firebase";
import '../assets/Sidebar.css';
import { useDataLayerValue } from '../StateManagement/StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useDataLayerValue();
    const history = useHistory();
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>{

            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
            console.log(snapshot.docs[0].id);
            history.push(`/rooms/${snapshot.docs[0].id}`)
        });

        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photoURL}/>
                <div className="sidebar___headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}

            </div>
        </div>
    )
}

export default Sidebar
