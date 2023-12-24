import { socket } from "@/common/lib/socket";
import { useEffect, useState } from "react"
import { UserMouse } from "./UserMouse";
import { useUserIds } from "@/common/recoil/users";
import { useRoom } from "@/common/recoil/room";

export const MouseRenderer =()=>{
    const room=useRoom();
    return(
        <>
            {[...room.users.keys()].map((userId)=>{
                if(userId===socket.id) return null;
                return<UserMouse userId={userId} key={userId}/>
            })}
        </>
    )
}