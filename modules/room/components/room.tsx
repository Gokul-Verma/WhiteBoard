import { useRoom, useRoomId, useSetRoomId } from "@/common/recoil/room";
import RoomContextProvider from "../context/Room.context"
import Canvas from "./Canvas"
import { MousePosition } from "./MousePosition"
import { MouseRenderer } from "./MouseRenderer"
import { ToolBar } from "../components/toolbar/ToolBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { socket } from "@/common/lib/socket";
import NameInput from "./NameInput";

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
                <ToolBar/>
                <Canvas/>
                <MousePosition/>
                <MouseRenderer/>
            </div>
        </RoomContextProvider>
    )
};

export default Room;
