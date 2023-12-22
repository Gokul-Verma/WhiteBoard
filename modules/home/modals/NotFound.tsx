import { useModal } from "@/common/recoil/modal"
import {AiOutlineClose} from "react-icons/ai";

const NotFoundModal =({id}:{id:string})=>{
    const {closeModal}=useModal();
    return(
        <div style={{}}>
            <button onClick={closeModal} style={{}}>
                <AiOutlineClose/>
            </button>
            <h2>NOT FOUBD </h2>
        </div>
    )
};

export default NotFoundModal;