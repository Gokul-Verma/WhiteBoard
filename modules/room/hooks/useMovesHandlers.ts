import { useMyMoves, useRoom } from "@/common/recoil/room";
import { useRefs } from "./useRefs"
import { useEffect, useMemo, useState } from "react";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { resolve } from "path";
import { socket } from "@/common/lib/socket";

let prevMovesLength=0;

export const useMovesHandlers=()=>{

    const {canvasRef,minimapRef}=useRefs();

    const room=useRoom();
    const {handleAddMyMove,handleRemoveMyMove}=useMyMoves();

    const [ctx,setCtx]=useState<CanvasRenderingContext2D>();

    useEffect(()=>{
        const newCtx=canvasRef.current?.getContext("2d");

        if(newCtx)  setCtx(newCtx)
    },[canvasRef]);

    const sortedMoves=useMemo(()=>{
        const{usersMoves,movesWithoutUser,myMoves}=room;
        const moves=[...movesWithoutUser,...myMoves];

        usersMoves.forEach((userMoves) => {
            moves.push(...userMoves);
        });
        moves.sort((a,b)=>a.timestamp-b.timestamp);
        return moves;

    },[room]);

    const copyCanvasToSmall =()=>{
        if(canvasRef.current&&minimapRef.current)
        {
          const smallCtx=minimapRef.current.getContext("2d");
          if(smallCtx)
          {
            smallCtx.clearRect(0,0,smallCtx.canvas.width,smallCtx.canvas.height)
            smallCtx.drawImage(
                canvasRef.current,
                0,
                0,
                smallCtx.canvas.width,
                smallCtx.canvas.height,
            );
          }
        }
    };

    const drawMove = (move: Move, image?: HTMLImageElement) => {
        new Promise((resolve)=>{

            const { path } = move;
        
            if (!ctx || !path.length) return;
        
            const moveOptions = move.options;
            if (moveOptions.shape === "image" && image)
            {
                const img=new Image();
                img.src=move.base64;
                
                img.addEventListener('load',()=>{
                    ctx?.drawImage(image, path[0][0], path[0][1]);
                    copyCanvasToSmall();
                    
                    resolve("bye");

                });
                return;
            }
            ctx.lineWidth=moveOptions.lineWidth;
            ctx.strokeStyle=moveOptions.lineColor;

            if(move.eraser) 
                ctx.globalCompositeOperation="destination-out"
            
                switch (moveOptions.shape) {
                case "line": {
                ctx.beginPath();
                path.forEach(([x, y]) => {
                  ctx.lineTo(x, y);
                });
        
                ctx.stroke();
                ctx.closePath();
                break;
              }
        
              case "circle": {
                const { cX, cY, radiusX, radiusY } = move.circle;
        
                ctx.beginPath();
                ctx.ellipse(cX, cY, radiusX, radiusY, 0, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
                break;
              }
        
              case "rect": {
                const { width, height } = move.rect;
        
                ctx.beginPath();
        
                ctx.rect(path[0][0], path[0][1], width, height);
                ctx.stroke();
                ctx.fill();
        
                ctx.closePath();
                break;
              }
        
              default:
                break;
            }

            copyCanvasToSmall();
                    
            resolve("bye");
        })
    
        //if (moveOptions.mode === "select") return;
    
        // ctx.lineWidth = moveOptions.lineWidth;
        // ctx.strokeStyle = getStringFromRgba(moveOptions.lineColor);
        // ctx.fillStyle = getStringFromRgba(moveOptions.fillColor);
        // if (moveOptions.mode === "eraser")
        //   ctx.globalCompositeOperation = "destination-out";
        // else ctx.globalCompositeOperation = "source-over";
    

    
    
      };
    
      const drawAllMoves=async()=>{
        if(!ctx) return;

        for(const move of sortedMoves)
        {
            await drawMove(move); 
        }
      };

      useEffect(()=>{

        socket.on("your_move",(move)=>[
            handleAddMyMove(move)

        ])

        return ()=>{
            socket.off("your_move");
        }
      },[handleAddMyMove]);

      useEffect(()=>{
        if(prevMovesLength>=sortedMoves.length||!prevMovesLength)
        {
            drawAllMoves();
        }
        else
            drawMove(sortedMoves[sortedMoves.length-1])
      
        return ()=>{
            prevMovesLength=sortedMoves.length;
        }
        },[sortedMoves]);

        const handleUndo = () => {
            if (ctx) {
              const move = handleRemoveMyMove();
        
              if (move?.options.mode === "select") clearSelection();
              else if (move) {
                addSavedMove(move);
                socket.emit("undo");
              }
            }
          };
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const handleRedo = () => {
            if (ctx) {
              const move = removeSavedMove();
        
              if (move) {
                socket.emit("draw", move);
              }
            }
          };
        
          useEffect(() => {
            const handleUndoRedoKeyboard = (e: KeyboardEvent) => {
              if (e.key === "z" && e.ctrlKey) {
                handleUndo();
              } else if (e.key === "y" && e.ctrlKey) {
                handleRedo();
              }
            };
        
            document.addEventListener("keydown", handleUndoRedoKeyboard);
        
            return () => {
              document.removeEventListener("keydown", handleUndoRedoKeyboard);
            };
          }, [handleUndo, handleRedo]);
        
          return { handleUndo, handleRedo };
}