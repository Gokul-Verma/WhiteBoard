import { useModal } from "@/common/recoil/modal"
import {AiOutlineClose} from "react-icons/ai";

const NotFoundModal =({id}:{id:string})=>{
    const {closeModal}=useModal();
    return(
        <div style={{}}>
            <button onClick={closeModal} style={{}}>
                <AiOutlineClose/>
            </button>
            <h2>ROOM WITH ID ({id}) NOT FOUND </h2>
        </div>
    )
};

export default NotFoundModal;