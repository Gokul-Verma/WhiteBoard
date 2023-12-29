import { Dispatch, SetStateAction, forwardRef, useEffect, useRef } from "react";
import {MotionValue, useMotionValue, motion} from "framer-motion";
import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useRefs } from "../../hooks/useRefs";


const MiniMap = 
({dragging,setMovedMiniMap}:{
    dragging: boolean;
    setMovedMiniMap:Dispatch<SetStateAction<boolean>>
})=>{
    const {x,y}=useBoardPosition();
    const containerRef=useRef<HTMLDivElement>(null)
    const {minimapRef}=useRefs();
    const {width,height}=useViewPortSize();
     
    const miniX=useMotionValue(0)
    const miniY=useMotionValue(0)
    
    useEffect(()=>{
        miniX.onChange((newX)=>{
            if(!dragging)
                x.set(-newX*7);
        })
        miniY.onChange((newY)=>{
            if(!dragging)
                y.set(-newY*7);
        });

        return ()=>{
            miniX.clearListeners()
            miniY.clearListeners()
        };
     },[dragging,miniX,miniY,x,y]);
    
     return (
     <div ref={containerRef} style={{
        width:CANVAS_SIZE.width/7,
        height:CANVAS_SIZE.height/7,
        position: 'absolute',
        right: '10px',
        top: '10px',
        zIndex: 30,
        backgroundColor: 'grey', // Specify your preferred shade of grey using its hex code
    }}>
        <canvas
            ref={minimapRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            style={{ height: '100vh', width: '100vw' }}
        />
        <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragTransition={{power:0,timeConstant:0}}
            onDragStart={()=>setMovedMiniMap((prev:boolean)=>!prev)}
            onDragEnd={()=>setMovedMiniMap((prev:boolean)=>!prev)}
            //className="absolute top-0 left-0 cursor-grab border-2 border-red-500"
            style={{
                x:miniX,
                y:miniY,
                position: 'absolute',
                top: 0,
                left: 0,
                cursor: 'grab',
                border: '2px solid #ff0000', // border-red-500
                width: width / 7,
                height: height / 7,
                
                
                
            }}  
            animate={{x:-x.get()/10,y:-y.get()/10}}
            transition={{duration:0}}
        >
        </motion.div>

    </div>
    )
}

export default MiniMap;