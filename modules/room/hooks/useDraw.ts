import { useMyMoves } from "@/common/recoil/room";
import { useBoardPosition } from "./useBoardPosition";
import { getPos } from "@/common/lib/getPos";
import { socket } from "@/common/lib/socket";
import { useOptionValue, useOptions } from "@/common/recoil/options";
import { useUsers } from "@/common/recoil/users";
import { useState, useEffect, useCallback } from "react";
import { drawAllMoves } from "../helper/canvas.helpers";

let tempMoves :[number,number][]=[];
export const useDraw =(
    ctx:CanvasRenderingContext2D|undefined,
    blocked:boolean,
)=>
{
    const {handleRemoveMyMove,handleAddMyMOve}=useMyMoves();

    const users=useUsers();
    const options=useOptionValue();
    const [drawing,setDrawing]=useState(false);
    const boardPosition=useBoardPosition();

    const movedX=boardPosition.x;
    const movedY=boardPosition.y;



    useEffect(()=>{
        if(ctx)
        {
            ctx.lineJoin="round";
            ctx.lineCap= "round";
            ctx.lineWidth=options.lineWidth;
            ctx.strokeStyle=options.lineColor;
        }
    },[ctx,options.lineWidth,options.lineColor]);


    const handleUndo=useCallback(()=>{
        if(ctx){
            handleRemoveMyMove();
            socket.emit("undo")

        }
    },[ctx,handleRemoveMyMove]);

    useEffect(()=>{
        const handleUndoKeyBoard =(e:KeyboardEvent)=>{
            if(e.key==='z'&&e.ctrlKey){
                handleUndo();
            }
        }

        document.addEventListener("keydown",handleUndoKeyBoard);
    },[handleUndo]);


    const handleStartDrawing =(x:number,y:number)=>{
        if(!ctx||blocked)
            return;
        //moves=[[x+movedX,y+movedY]];
        setDrawing(true);
        ctx.beginPath();
        ctx.lineTo(getPos(x , movedX),getPos(y,movedY));
        ctx.stroke();

        tempMoves.push([getPos(x,movedX),getPos(y,movedY)]);
    }

    const handleEndDrawing=()=>{
        if(!ctx||blocked)
            return;
        
        ctx.closePath();
        setDrawing(false);

        const move:Move={
            path:tempMoves,
            options,
        };

        handleAddMyMOve(move);

        tempMoves=[]
        socket.emit("draw",move);
        
    };

    const handleDraw =(x:number,y:number)=>{
        if(!ctx|| !drawing||blocked)
        {
            return;
        }
        {
            ctx.lineTo(getPos(x,movedX),getPos(y,movedY));
            ctx.stroke();
            tempMoves.push([getPos(x,movedX),getPos(y,movedY)]);
        }
    };

    return{
        handleDraw,
        handleEndDrawing,
        handleStartDrawing,
        handleUndo,
        drawing,
    }
};