import { useRoomId } from "@/common/recoil/room";
import RoomContextProvider from "../context/Room.context"
import Canvas from "./Canvas"
import { MousePosition } from "./MousePosition"
import { MouseRenderer } from "./MouseRenderer"
import { ToolBar } from "./ToolBar";

const Room =()=>{

    const roomId=useRoomId();

    if(!roomId)
        return<div>NO ROOM ID</div>

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
