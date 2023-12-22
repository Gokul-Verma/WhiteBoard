import { socket } from "@/common/lib/socket";
import { useSetRoomId } from "@/common/recoil/room";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react"


const Home=()=>{
    const[roomId,setRoomId]=useState("");
    const setAtomRoomId=useSetRoomId();
    const router =useRouter();

    useEffect(()=>{
        socket.on("created",(roomIdFromServer)=>{
            setAtomRoomId(roomIdFromServer);
            router.push(roomIdFromServer);
        });
        
        socket.on("joined",(roomIdFromServer,failed)=>{
            if(!failed)
            {
                setAtomRoomId(roomIdFromServer);
                router.push(roomIdFromServer);
            }
            else    
                console.log("failed to join room");
        });
        return ()=>{
            socket.off("created");
            socket.off("joined");
        }
    },[router,setAtomRoomId]);

    
    const handleCreateRoom =()=>{
        socket.emit("create_room");
    }

    const handleJoinRoom =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        socket.emit("join_room",roomId);
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
                Enter Room Id
            </label>
            <input style={{}}
            id="room-id"
            placeholder="Room id..."
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}/>
            <button
                style={{
                    borderRadius:"5px",
                    border:"1px solid black",
                    padding:"5px",

                }}
                type="submit"
            > Join</button>
           </form>
           <div>
            <h5> Create New Room</h5>
            <button
                style={{
                    borderRadius:"5px",
                    border:"1px solid black",
                    padding:"5px",

                }}
                type="submit"
                onClick={handleCreateRoom}
            > Create</button>
           </div>
        </div>
    )
};

export default Home;