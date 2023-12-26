import { useRoom } from "@/common/recoil/room";

const UserList=()=>{
    const room =useRoom();
    
    return(
        <div>
            {[...room.users.keys()].map((userId,index)=>{
                return(
                    <div key={userId} style={{
                        backgroundColor:room.users.get(userId)?.color||"black"

                    }}>
                        {room.users.get(userId)?.name.split("")[0]||"A"}
                    </div>
                )
            })

            }
        </div>
    )
}

export default UserList;