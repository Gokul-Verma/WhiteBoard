import RoomContextProvider from "../context/Room.context"
import Canvas from "./Canvas"
import { MousePosition } from "./MousePosition"
import { MouseRenderer } from "./MouseRenderer"

const Room =()=>{

    return(
        <RoomContextProvider>
            <div style={{
                position:"relative",
                height:"100%",
                width:"100%",
                overflow:"hidden"
        }}>
                <Canvas/>
                <MousePosition/>
                <MouseRenderer/>
            </div>
        </RoomContextProvider>
    )
};

export default Room;
