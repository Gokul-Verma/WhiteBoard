import modalAtom from "@/common/recoil/modal"
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil"
import Portal from "../../portal/component/Portal";
import { bgAnimation, modalAnimation } from "../animations/ModalManager.animations";

const ModalManager =()=>{

    const [{opened,modal},setModal]=useRecoilState(modalAtom);

    const [portalNode,setPortalNode]=useState<HTMLElement>();

    useEffect(()=>{
        if(!portalNode)
        {
            const node=document.getElementById("portal");
            if(node) setPortalNode(node);

            return;
        }
        if(opened)
        {
            portalNode.style.pointerEvents="all";
            
        }
        else{
            portalNode.style.pointerEvents="none";
        }
    },[opened,portalNode]);


    return(
        <Portal>
            <motion.div
            onClick={()=>setModal({modal:<></>,opened:false})}
            variants={bgAnimation}
            initial="closed"
            animate={opened?"opened":"closed"}
            >

                <AnimatePresence>
                    (opened&&(
                        <motion.div
                        variants={modalAnimation}
                        initial="closed"
                        animate="opened"
                        exit="exited"
                        onClick={(e)=>e.stopPropagation()}
                        >
                            {modal}
                        </motion.div>
                    ))
                </AnimatePresence>
            </motion.div>
        </Portal>
    )
};

export default ModalManager;