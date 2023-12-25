import { useSetOptions } from "@/common/recoil/options/options.hooks"
import ColorPicker from "./colorPicker"
import LineWidthPicker from "./LineWidthPicker"
import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs"
import {HiOutlineDownload} from "react-icons/hi";

export const ToolBar =()=>{

    const setOptions =useSetOptions()

    return(
        <div
        style={{
            position:"absolute",
            left:10,
            top:"50%",
            zIndex:50,
            display:"flex",
            flexDirection:"column",
            justifyItems:"center",
            gap:5,
            background:"black",
            color:"white",
            transform:"translateY(-50%)"
        }}
        >
            <ColorPicker/>
            <LineWidthPicker/>
            <button style={{
                
            }}>
                <BsFillChatFill/>
            </button>
            <button style={{
                
            }}>
                <BsFillImageFill/>
            </button>
            <button style={{
                
            }}>
                <BsThreeDots/>
            </button>
            <button style={{
                
            }}>
                <HiOutlineDownload/>
            </button>
        </div>
    )
}