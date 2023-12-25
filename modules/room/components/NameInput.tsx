import { socket } from "@/common/lib/socket";
import { useSetRoomId } from "@/common/recoil/room"
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";


const NameInput=()=>{
    const setRoomId =useSetRoomId();

    const [name,setName] =useState("");

    const router=useRouter();

    const roomId=(router.query.roomId||"").toString();

    useEffect(()=>{
        if(!roomId) return;

        socket.emit("check_room",roomId);

        socket.on("room_exists",(exists)=>{
            console.log("room exists",exists);
            if(!exists)
            {
                router.push("/");
            }
        })
        return()=>{
            socket.off("room_exists")
        }
    },[roomId,router]);

    useEffect(()=>{
        const handleJoined=(roomIdFromServer:string,failed?:boolean)=>
        {
            if(failed)
                router.push("/");
            else{
                setRoomId(roomIdFromServer);
            }
        };
        socket.on("joined",handleJoined);
        return()=>{
            socket.off("joined",handleJoined);
        }
    },[router,setRoomId])

    const handleJoinRoom=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        socket.emit("join_room",roomId,name);
    };

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
           <h1>
            DIGIBOARD
           </h1>
           <h3>
            Real Time WhiteBoard
           </h3>

           <div
           style={{
            
           }}>
            <label>Enter Your Name</label>
            <input placeholder="USERNAME"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
            ></input>
           </div>

           <form
           style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:2
           }}
           onSubmit={handleJoinRoom}
           >
            <label htmlFor="room-id"
                style={{
                    alignSelf:"flex-start",
                    fontWeight:"bold",
                    lineHeight:"1.25"
                }}
            >
                Enter Room 
            </label>
            
           </form>
           
        </div>
    )
};

export default NameInput;