import { useSetOptions } from "@/common/recoil/options/options.hooks"


export const ToolBar =()=>{

    const setOptions =useSetOptions()

    return(
        <div
        style={{
            position:"absolute",
            left:0,
            top:0,
            zIndex:50,
            display:"flex",
            gap:5,
            background:"black",
            color:"white"
        }}
        >
        <button onClick={()=>setOptions((prev)=>({...prev,lineColor:"red"}))}>RED</button>
        <button onClick={()=>setOptions((prev)=>({...prev,lineColor:"green"}))}>GREEN</button>
        <button onClick={()=>setOptions((prev)=>({...prev,lineColor:"blue"}))}>BLUE</button>
        <button onClick={()=>setOptions((prev)=>({...prev,lineColor:"black"}))}>BLACK</button>

        </div>
    )
}