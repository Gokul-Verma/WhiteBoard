import { DEFAULT_EASE } from "@/common/constants/easings";
import { socket } from "@/common/lib/socket";
import { useRoom } from "@/common/recoil/room"
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsChatFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useList } from "react-use";
import Message from "./Message";
import ChatInput from "./ChatInput";


const Chat =()=>{
    const room=useRoom();

    const[newMsg,setNewMsg]=useState(false);
    const [opened,setOpened]=useState(false);

    const[msgs,setMsgs]=useList<Message>([]);
    const msgList=useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handleNewMsg=(userId:string,msg:string)=>{
            const user =room.users.get(userId);

            setMsgs.push({
                userId,
                msg,
                id:msgs.length+1,
                username:user?.name||"Anonymous",
                color:user?.color||"black",
            });

            msgList.current?.scroll({top:msgList.current.scrollHeight});

            if(!opened)setNewMsg(true)
        };
    socket.on("new_msg",handleNewMsg);

    return ()=>{
        socket.off("new_msg",handleNewMsg);
    };

    },[setMsgs,msgs,opened,room.users]);
    
    return(
        <motion.div
        style={{

        }}
        animate={{y:opened?0:260}}
        transition={{ease:DEFAULT_EASE,duration:0.2}}
        >
            <button
            style={{

            }}
            onClick={()=>{
                setOpened((o)=>!o);
                setNewMsg(false)
            }}
            >
            <div
            style={{

            }}
            >
                <BsChatFill/>
                Chat
                {newMsg&&(
                    <p
                    style={{

                    }}
                    >
                        New!
                    </p>
                )}

            </div>

            <motion.div
            animate={{rotate:opened?0:100}}
            transition={{ease:DEFAULT_EASE,duration:0.2}}
            >
            <FaChevronDown/>
            </motion.div>
            </button>
            <div className="flex flex-1 flex-col justify-between bg-white p-3">
        <div className="h-[190px] overflow-y-scroll pr-2" ref={msgList}>
          {msgs.map((msg) => (
            <Message key={msg.id} {...msg} />
          ))}
        </div>
        <ChatInput />
      </div>
        </motion.div>
    )
};
export default Chat;