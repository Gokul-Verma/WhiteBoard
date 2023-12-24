import { useOptions } from "@/common/recoil/options"
import { AnimatePresence, motion } from "framer-motion";
import { relative } from "path";
import { useRef, useState } from "react"
import { useClickAway } from "react-use";
import { ColorPickerAnimation } from "../../animations/ColorPicker.animations";
import {HexColorPicker} from "react-colorful";

const ColorPicker=()=>{
    const [options,setOptions] =useOptions();

    const ref= useRef<HTMLDivElement>(null);

    const[opened,setOpened]=useState(false);

    useClickAway(ref,()=>{
        setOpened(false);
    })

    return(
        <div style={{
            position:"relative",
            display:"flex",
            justifyItems:"center",


        }} 
        ref={ref}>
            <button style={{}} 
            onClick={()=>setOpened(!opened)}
            >
                <AnimatePresence>
                    (opened&&(
                        <motion.div
                        style={{
                            position:"absolute",
                            top:0,
                            left:14,
                        }}
                        //variants={ColorPickerAnimation}
                        initial="from"
                        animate="to"
                        exit="from"
                        >
                            <HexColorPicker 
                            color={options.lineColor}
                            onChange={(e)=>setOptions((prev)=>({...prev,lineColor:e}))}
                            />
                        </motion.div>
                    ))
                </AnimatePresence>
            </button>

        </div>
    )
}