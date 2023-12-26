import { useSetOptions } from "@/common/recoil/options/options.hooks"
import ColorPicker from "./colorPicker"
import LineWidthPicker from "./LineWidthPicker"
import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs"
import {HiOutlineDownload} from "react-icons/hi";
import Eraser from "./Eraser";
import { RefObject } from "react";
import { FaUndo } from "react-icons/fa";

export const ToolBar =({undoRef}:{undoRef:RefObject<HTMLButtonElement>})=>{

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

            <button
            ref={undoRef}
            >
                <FaUndo/>
            </button>

            <div
             style={{

            }}
            
            />

            
            <ColorPicker/>
            <LineWidthPicker/>
            <Eraser/>
            
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