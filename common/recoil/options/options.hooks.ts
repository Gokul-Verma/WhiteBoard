import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { optionsAtom } from "./options.atoms"

export const useOptionValue =()=>{
    const options=useRecoilValue(optionsAtom)

    return options;
};

export const useOptions=()=>{
    const options =useRecoilState(optionsAtom);

    return options;
}

export const useSetOptions =()=>{
    const setOptions =useSetRecoilState(optionsAtom);
    
    return setOptions;
}