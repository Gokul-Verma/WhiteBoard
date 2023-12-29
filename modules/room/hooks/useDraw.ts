import { useMyMoves, useRoom } from "@/common/recoil/room";
import { useBoardPosition } from "./useBoardPosition";
import { getPos } from "@/common/lib/getPos";
import { socket } from "@/common/lib/socket";
import { useOptionValue, useOptions } from "@/common/recoil/options";
import { useUsers } from "@/common/recoil/users";
import { useState, useEffect, useCallback } from "react";
import { drawCircle, drawLine, drawRect } from "../helper/canvas.helpers";
import { useRefs } from "./useRefs";
import { string } from "prop-types";

let tempMoves: [number, number][] = [];
let tempCircle = { cX: 0, cY: 0, radiusX: 0, radiusY: 0 };
let tempSize = { width: 0, height: 0 };
let tempRadius=0;


export const useDraw =(
    blocked:boolean,
    drawAllMoves:()=>void
    )=>
    {
        const {canvasRef}=useRefs();
        const {handleRemoveMyMove,handleAddMyMove}=useMyMoves();
        const room=useRoom();
        const users=useUsers();
        const options=useOptionValue();
        const [drawing,setDrawing]=useState(false);
        const boardPosition=useBoardPosition();
        
        const movedX=boardPosition.x;
        const movedY=boardPosition.y;
        const [ctx,setCtx]=useState<CanvasRenderingContext2D>()
        
        useEffect(()=>{
            const newCtx=canvasRef.current?.getContext("2d");
            if(newCtx)
            {
                setCtx(newCtx);
            }
        },[canvasRef]);
        
        const setCtxOptions=()=>{
            if(ctx)
            {
                ctx.lineJoin="round";
                ctx.lineCap="round";
                (ctx.lineWidth=options.lineWidth),(ctx.strokeStyle=options.lineColor);
                if(options.erase)
                    ctx.globalCompositeOperation="destination-out";
                else 
                    ctx.globalCompositeOperation="source-over"
            }
        };

    const drawAndSet=()=>{
        drawAllMoves();
        setCtxOptions();

    };

    const handleStartDrawing =(x:number,y:number)=>{
        if(!ctx||blocked)
            return;
        //moves=[[x+movedX,y+movedY]];.

        const FinalX=getPos(x,movedX);
        const FinalY=getPos(y,movedY);
        setDrawing(true);
        setCtxOptions();
        ctx.beginPath();
        ctx.lineTo(FinalX,FinalY);
        ctx.stroke();

        tempMoves.push([FinalX,FinalY]);
    }

    const handleEndDrawing=()=>{
        if(!ctx||blocked)
            return;
        
        setDrawing(false);
        ctx.closePath();
        if(options.shape!=='circle')
            tempRadius=0;
        if(options.shape!=='rect')
            tempSize={width:0,height:0}

        const move:Move={
            ...tempSize,
            radius:tempRadius,
            path:tempMoves,
            options,
            timestamp:0,
            eraser:options.erase,
            base64:""
        };

       

        tempMoves=[]
        socket.emit("draw",move);
        
    };

    const handleDraw =(x:number,y:number,shift?:boolean)=>{
        if(!ctx|| !drawing||blocked)
        {
            return;
        }
        const finalX=getPos(x,movedX);
        const finalY=getPos(y,movedY);
        switch (options.shape) {
            case "line":
              if (shift) tempMoves = tempMoves.slice(0, 1);
      
              drawLine(ctx, tempMoves[0], finalX, finalY, shift);
      
              tempMoves.push([finalX, finalY]);
              break;
      
            case "circle":
              tempCircle = drawCircle(ctx, tempMoves[0], finalX, finalY, shift);
              break;
      
            case "rect":
              tempSize = drawRect(ctx, tempMoves[0], finalX, finalY, shift);
              break;
      
            default:
              break;
          }
};

    return{
        handleDraw,
        handleEndDrawing,
        handleStartDrawing,
        drawing,
    }
};