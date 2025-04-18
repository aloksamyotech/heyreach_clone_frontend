import { fetchData } from "api";
import { useState } from "react";

export const useLinkedinCustomHook = ()=>{
    const [linkedinAccount,setLinkedinAccount] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLimitDrawer,setLimitDrawer] = useState(false);
    const [rowData,setRowData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const getPaginatedData = async()=>{
        const userData = JSON.parse(localStorage.getItem('user'));
        const response = await fetchData(`/user/linkedInAccount/getPaginatedData?page=${currentPage}&userId=${userData?._id}&limit=${pageSize}`);
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
        setCurrentPage
    }
}