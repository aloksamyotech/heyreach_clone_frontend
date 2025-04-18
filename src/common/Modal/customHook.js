import { putData } from "api";

export const useCustomHook = ()=>{

    const updateData = async(route,data)=>{
        const response = await putData(route,data);
        return response;
    }

    return {
        updateData
    }
}