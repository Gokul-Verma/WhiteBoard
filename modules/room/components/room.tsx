import { useRoom, useRoomId, useSetRoomId } from "@/common/recoil/room";
import RoomContextProvider from "../context/Room.context"
import Canvas from "./board/Canvas"
import { MousePosition } from "./board/MousePosition"
import { MouseRenderer } from "./board/MouseRenderer"
import { ToolBar } from "../components/toolbar/ToolBar";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { socket } from "@/common/lib/socket";
import NameInput from "./NameInput";
import UserList from "./UserList";

const Room =()=>{

    const room=useRoom();

    const undoRef=useRef<HTMLButtonElement>(null);
    
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
                <ToolBar ref={undoRef}/>
                <Canvas ref={undoRef}/>
                <MousePosition/>
                <MouseRenderer/>
            </div>
        </RoomContextProvider>
    )
};

export default Room;
