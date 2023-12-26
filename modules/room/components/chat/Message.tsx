import { socket } from "@/common/lib/socket"


const Message=({userId,msg,username,color}:Message)=>{
    const me=socket.id===userId

    return(
        <div
        style={{

        }}

        >
        {!me&&(
            <h5 style={{color}}
            >
                {username}
            </h5>
        
        )}
        <p style={{wordBreak:"break-all"}}>{msg}</p>
        </div>
    )
};

export default Message;