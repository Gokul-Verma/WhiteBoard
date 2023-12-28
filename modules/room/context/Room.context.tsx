import { COLORS_ARRAY } from "@/common/constants/color";
import { socket } from "@/common/lib/socket";
import { useSetRoom, useSetUsers } from "@/common/recoil/room/room.hooks";
import usersAtom, { useUserIds } from "@/common/recoil/users";
import { MotionValue, useMotionValue } from "framer-motion";
import { createContext,ReactChild, RefObject, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";


export const roomContext=createContext<{
    x:MotionValue<number>;
    y:MotionValue<number>;
    undoRef:RefObject<HTMLButtonElement>
    canvasRef: RefObject<HTMLCanvasElement>
    bgRef:RefObject<HTMLCanvasElement>
}>(null!);

const RoomContextProvider=({children}:{children:ReactChild})=>{
    
    const setRoom=useSetRoom();
    const {handleAddUser,handleRemoveUser}=useSetUsers();

    const x = useMotionValue(0)
    const y = useMotionValue(0);

    const undoRef=useRef<HTMLButtonElement>(null);
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const bgRef=useRef<HTMLCanvasElement>(null);


    useEffect(()=>{
        socket.on("room",(room,userMovesToParse,usersToParse)=>{
            const usersParsed=new Map<string,string>(JSON.parse(usersToParse));
            const userMoves=new Map<string,Move[]>(JSON.parse(userMovesToParse));
            const users=new Map<string,User>();

            usersParsed.forEach((name,id)=>{
                if(id===socket.id)return;

                const index=[...usersParsed.keys()].indexOf(id);
                const color=COLORS_ARRAY[index%COLORS_ARRAY.length]

                users.set(id,{
                    name,
                    color
                })
            })


            setRoom((prev)=>({
                ...prev,
                users,
                userMoves,
                movesWithoutUser:room.drawed
            }))
        })
       socket.on("new_user",(userId,username)=>{
        handleAddUser(userId,username);
       });
       
        socket.on("user_disconnected",(userId)=>{
           handleRemoveUser(userId);
            });
        

        return ()=>{
            socket.off("room");
            socket.off("new_user");
            socket.off("user_disconnected");
        }
    },[handleAddUser,handleRemoveUser,setRoom]);

    return (
        <roomContext.Provider value={{x,y,bgRef,undoRef,canvasRef}}>{children}</roomContext.Provider>
    )
};
export default RoomContextProvider;