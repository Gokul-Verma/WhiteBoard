import { useOptions } from "@/common/recoil/options";
import { useRef, useState } from "react"
import { BsPencilFill } from "react-icons/bs";
import {BiRectangle} from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { ColorPickerAnimation } from "../../animations/ColorPicker.animations";


const ShapeSelector =()=>{
    const ref=useRef<HTMLDivElement>(null);

    const [options,setOptions]= useOptions();

    const [opened,setOpened]=useState(false);

    useClickAway(ref,()=>setOpened(false));

    const handleShapeChange =(shape:Shape)=>{
        setOptions((prev)=>({
            ...prev,
            shape,
        }));
        setOpened(false);
    };

    return (
        <div ref={ref}
        style={{

        }}
        
        >
            <button
            onClick={()=>setOpened((prev)=>!prev)}
            >
                {options.shape==='circle'&&<FaCircle/>}
                {options.shape==='rect'&&<BiRectangle/>}
                {options.shape==='line'&&<BsPencilFill/>}
            </button>
            
            <AnimatePresence>
                {opened&&(
                    <motion.div
                    variants={ColorPickerAnimation}
                    initial="from"
                    animate="to"
                    exit="from"
                    >
                    <button
                    onClick={()=>handleShapeChange("circle")}
                    >
                    <FaCircle/>
                    </button>
                    <button
                    onClick={()=>handleShapeChange("rect")}
                    >
                    <BiRectangle/>
                    </button>
                    <button
                    onClick={()=>handleShapeChange("line")}
                    >
                    <BsPencilFill/>
                    </button>

                    </motion.div>
                )}
            </AnimatePresence>
         </div>
    )
};

export default ShapeSelector;