import { useRoom, useRoomId, useSetRoomId } from "@/common/recoil/room";
import RoomContextProvider from "../context/Room.context"
import Canvas from "./board/Canvas"
import { MousePosition } from "./board/MousePosition"
import { MouseRenderer } from "./board/MouseRenderer"
import { ToolBar } from "./toolbar/ToolBar";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { socket } from "@/common/lib/socket";
import NameInput from "./NameInput";
import UserList from "./UserList";
import ChatInput from "./chat/ChatInput";
import Chat from "./chat/Chat";
import MoveImage from "./toolbar/MoveImage";

const Room =()=>{

    const room=useRoom();
    if(!room.id)return <NameInput/>

    return(
        <RoomContextProvider>
            <div style={{
                position:"relative",
                height:"vh",
                width:"vw",
                overflow:"hidden"
            }}>
                <UserList/>
                <ToolBar />
                <MoveImage/>
                <Canvas />
                <MousePosition/>
                <MouseRenderer/>
                <Chat/>
            </div>
        </RoomContextProvider>
    )
};

export default Room;
