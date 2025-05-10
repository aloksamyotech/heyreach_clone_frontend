import { fetchData, postData } from "api";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiRoutes } from "api/config";

export const useLinkedinCustomHook = ()=>{
    const [linkedinAccount,setLinkedinAccount] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLimitDrawer,setLimitDrawer] = useState(false);
    const [rowData,setRowData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [otpRequired,setOtpRequired] = useState(false);

    const connectAccount = async(data)=>{
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        data={
            ...data,
            userId:userId
        }
        const response = await postData(apiRoutes?.connectAccount,data);
        if(response && response?.isOtprequired){
           setOtpRequired(true);
           toast.success('Otp Send Successfully!\n Please Verify OTP');
           localStorage.setItem('sessionId',response?.data?.sessionId);  
        }else if(response && response?.success){
            toast.success(response?.data?.message);
            setOpenDrawer(false);
        }
    }

    const getPaginatedData = async()=>{
        const userData = JSON.parse(localStorage.getItem('user'));
        const response = await fetchData(`${apiRoutes?.getPaginatedLinkedInAccount}?page=${currentPage}&userId=${userData?._id}&limit=${pageSize}`);
            if(response?.success === true){
                setLinkedinAccount(response?.data?.data);
                setTotalCount(response?.data?.totalCount);
            }
    }

    return{
        getPaginatedData,
        linkedinAccount,
        totalCount,
        pageSize,
        setPageSize,
        rowData,
        setRowData,
        openDrawer,
        setOpenDrawer,
        openLimitDrawer,
        setLimitDrawer,
        currentPage,
        setCurrentPage,
        otpRequired,
        setOtpRequired,
        connectAccount
    }
}