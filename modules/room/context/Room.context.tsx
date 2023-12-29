import { COLORS_ARRAY } from "@/common/constants/color";
import { socket } from "@/common/lib/socket";
import { useRoom, useSetRoom, useSetUsers } from "@/common/recoil/room/room.hooks";
//import users from "@/common/recoil/users";
import usersAtom, { useUserIds } from "@/common/recoil/users";
import { MotionValue, useMotionValue } from "framer-motion";
import { createContext,ReactChild, RefObject, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import {toast} from "react-toastify";

export const roomContext=createContext<{
    x:MotionValue<number>;
    y:MotionValue<number>;
    undoRef:RefObject<HTMLButtonElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    bgRef:RefObject<HTMLCanvasElement>;
    minimapRef:RefObject<HTMLCanvasElement>;
    moveImage:string;
    setMoveImage:(base64:string)=>void;
}>(null!);

const RoomContextProvider=({children}:{children:ReactChild})=>{
    
    const setRoom=useSetRoom();
    const { users } = useRoom();
    const {handleAddUser,handleRemoveUser}=useSetUsers();

    const x = useMotionValue(0)
    const y = useMotionValue(0);

    const undoRef=useRef<HTMLButtonElement>(null);
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const bgRef=useRef<HTMLCanvasElement>(null);

    const [moveImage,setMoveImage]=useState("");
    useEffect(()=>{
        socket.on("room",(room,userMovesToParse,usersToParse)=>{
            const usersParsed=new Map<string,string>(JSON.parse(usersToParse));
            const userMoves=new Map<string,Move[]>(JSON.parse(userMovesToParse));
            const newUsers=new Map<string,User>();

            usersParsed.forEach((name,id)=>{
                if(id===socket.id)return;

                const index=[...usersParsed.keys()].indexOf(id);
                const color=COLORS_ARRAY[index%COLORS_ARRAY.length]

                newUsers.set(id,{
                    name,
                    color
                })
            })


            setRoom((prev)=>({
                ...prev,
                users:newUsers,
                userMoves,
                movesWithoutUser:room.drawed
            }))
        })
       socket.on("new_user",(userId,username)=>{
        toast(`${username} has joined the room.`, {
            position: "top-center",
            theme: "colored",
          });
        handleAddUser(userId,username);
       });
       
        socket.on("user_disconnected",(userId)=>{
            toast(`${users.get(userId)?.name || "Anonymous"} has left the room.`, {
                position: "top-center",
                theme: "colored",
              });
            handleRemoveUser(userId);
            });
        

        return ()=>{
            socket.off("room");
            socket.off("new_user");
            socket.off("user_disconnected");
        }
    },[handleAddUser,handleRemoveUser,setRoom,users]);

    return (
        <roomContext.Provider value={{x,y,bgRef,undoRef,canvasRef,minimapRef,moveImage,setMoveImage}}>{children}</roomContext.Provider>
    )
};
export default RoomContextProvider;