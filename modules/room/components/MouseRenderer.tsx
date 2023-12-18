import { socket } from "@/common/lib/socket";
import { useEffect, useState } from "react"
import { SocketMouse } from "./SocketMouse";

export const MouseRenderer =()=>{

    const [mouses,setMouses]=useState<string[]> ([]);

    console.log(mouses)

    useEffect(()=>{
        socket.on("users_in_room",(socketIds: any[])=>{
            const allUsers=socketIds.filter((socketId: string)=>socketId!=socket.id);
            setMouses(allUsers);
        });
        return () => {
            socket.off("users_in_room");
        }
    },[]);

    return(
        <>
            {mouses.map((socketId)=>{
                return<SocketMouse socketId={socketId} key={socketId}/>
            })}
        </>
    )
}