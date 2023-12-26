import { useEffect, useState } from "react";
import { useBoardPosition } from "../../hooks/useBoardPosition"
import { socket } from "@/common/lib/socket";
import { motion } from "framer-motion";
import {BsCursorFill} from "react-icons/bs"
import { useRoom } from "@/common/recoil/room";

export const UserMouse = ({userId}:{userId:string})=>{
    const {users}=useRoom();

    const [msg,setMsg]=useState("");
    const boardPos=useBoardPosition();
    const [x,setX] =useState(boardPos.x.get());
    const [y,setY] =useState(boardPos.y.get());

    const [pos,setPos] =useState({x:-1,y:-1});

    useEffect(()=>{
        socket.on("mouse_moved",(newX,newY,socketIdMoved)=>{
            if(socketIdMoved===userId)
            {
                setPos({x:newX,y:newY});
            }
        });

        const handleNewMsg=(msgUserId:string,newMsg:string)=>{
            if(msgUserId===userId)
            {
                setMsg(newMsg);
                setTimeout(()=>{
                setMsg("");
                },3000);
            }
        }

        socket.on("new_msg",handleNewMsg);
        return ()=>{
            socket.off("mouse_moved");
            socket.off("new_msg",handleNewMsg)
        }
    },[userId]);


    useEffect(()=>{
        const unsubscribe =boardPos.x.onChange(setX);
        return unsubscribe;
    },[boardPos.x]);
    useEffect(()=>{
        const unsubscribe =boardPos.y.onChange(setY);
        return unsubscribe;
    },[boardPos.y]);
    

    return(
        <motion.div
        
        style={{
            
            position:"absolute",
            top:0,
            left:0,
            pointerEvents:"none",
            color:users.get(userId)?.color,
        }}
        animate={{x:pos.x+x,y:pos.y+y}}
        transition={{duration: 0.2,ease:"linear"}}
        >
        <BsCursorFill />
        {msg&&(
            <p>{msg}</p>
        )}
        <p> {users.get(userId)?.name||"Anonymous"}</p>
        </motion.div>
    );

};