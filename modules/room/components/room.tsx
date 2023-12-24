import { useRoom, useRoomId, useSetRoomId } from "@/common/recoil/room";
import RoomContextProvider from "../context/Room.context"
import Canvas from "./Canvas"
import { MousePosition } from "./MousePosition"
import { MouseRenderer } from "./MouseRenderer"
import { ToolBar } from "./ToolBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { socket } from "@/common/lib/socket";

const Room =()=>{

    const roomId=useRoomId();
    const room=useRoom();
    const router=useRouter();
    const setRoomId=useSetRoomId();
    useEffect(()=>{
        const handleJoined=(roomIdFromServer:string,failed?:boolean)=>{
            if(failed)  router.push("/");
            else setRoomId(roomIdFromServer);
        };

        socket.on("joined",handleJoined);

        return ()=>{
            socket.off("joined",handleJoined);
        }
    },[router,setRoomId])

    if(!room.id){
        const dynamicRoomId=router.query.roomId?.toString();
        if(dynamicRoomId) socket.emit("join_room",dynamicRoomId);
        return null;
    }


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
