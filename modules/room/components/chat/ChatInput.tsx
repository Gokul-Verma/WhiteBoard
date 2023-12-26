import { socket } from "@/common/lib/socket";
import { FormEvent, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";


const ChatInput=()=>{

    const [msg,setMsg]=useState("");

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        socket.emit("send_msg",msg);
        setMsg("");
    };
    return(
        <form style={{

        }}
        onSubmit={handleSubmit}
        >
            <input 
            style={{

            }}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            />
              <button style={{

              }}
              type="submit"
              >
                <AiOutlineSend/>
                </button>
        </form>
    )
}

export default ChatInput;