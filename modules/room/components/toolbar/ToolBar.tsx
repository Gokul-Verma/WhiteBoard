import { useSetOptions } from "@/common/recoil/options/options.hooks"
import ColorPicker from "./colorPicker"
import LineWidthPicker from "./LineWidthPicker"
import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs"
import {HiOutlineDownload} from "react-icons/hi";
import Eraser from "./Eraser";
import { RefObject } from "react";
import { FaUndo } from "react-icons/fa";
import ShapeSelector from "./ShapeSelector";
import { useRefs } from "../../hooks/useRefs";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import ImagePicker from "./ImagePicker";

export const ToolBar=()=>{

    const {canvasRef,undoRef,bgRef}=useRefs();
    const handleDownload=()=>{
        const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canvas.png";
    link.click();
  };
    
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
            <ShapeSelector/>
            <LineWidthPicker/>
            <Eraser/>
            <ImagePicker/>
            
            <button style={{
                
            }}>
                <BsFillImageFill/>
            </button>
            <button style={{
                
            }}>
                <BsThreeDots/>
            </button>
            <button className="btn-icon text-2xl" onClick={handleDownload}>
                <HiOutlineDownload />
            </button>
             
        </div>
    )
}