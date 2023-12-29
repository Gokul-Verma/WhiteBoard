import { motion, useMotionValue } from "framer-motion";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useRefs } from "../../hooks/useRefs"
import { useMoveImage } from "../../hooks/useMoveImage";
import { getPos } from "@/common/lib/getPos";
import { socket } from "@/common/lib/socket";



const MoveImage=()=>{

    const {canvasRef}=useRefs();
    const {x,y}=useBoardPosition();

    const imageX=useMotionValue(50);
    const imageY=useMotionValue(50);

    const{moveImage,setMoveImage}=useMoveImage();

    const handlePlaceImage=()=>{
        const [finalX,finalY]=[getPos(imageX.get(),x),getPos(imageY.get(),y)];

        const move:Move={
            width:0,
            height:0,
            radius:0,
            path:[finalX,finalY],
            options:{
                lineWidth:1,
                lineColor:"black",
                erase:false,
                shape:"image"
            },
            timestamp:0,
            eraser:false,
            base64:moveImage
        };

        socket.emit("draw",move);

        setMoveImage("");
        imageX.set(50);
        imageY.set(50);

    };

    if(!moveImage)
        return null;

        return(
            <motion.div
                drag
                dragConstraints={canvasRef}
                dragElastic={0}
                dragTransition={{power:0.03,timeConstant:50}}
                style={{
                    x:imageX,
                    y:imageY,
                }}

            >
                <button
                style={{

                }}
                onClick={handlePlaceImage}
                
                >
                    Accept
                </button>
                <img alt ="image to place" src={moveImage}/>

            </motion.div>
        )
};

export default MoveImage;
