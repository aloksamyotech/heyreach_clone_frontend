import { fetchData } from "api/index.js";
import { useState } from "react";
import { apiRoutes } from "api/config";

export const useCustomLeadHook = (watch)=>{
    const [list,setList] = useState([]);
    const [limit,setLimit] = useState(10);
    const [page,setPage] = useState(1);
    const [openModal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [listCount,setListCount] = useState(0);
    const [lead,setLead] = useState([]);
    const [leadCount,setLeadCount] = useState(0);

    const fetchList = async()=>{
       const userId = JSON.parse(localStorage?.getItem('user'))?._id;
       var url = `${apiRoutes?.getPaginatedList}?userId=${userId}&page=${page}&limit=${limit}`;
       if(watch('search')){
        url = url + '&search='+watch('search');
       }
       if(watch('type')){
        url = url + '&type='+watch('type');
       }
       const response = await fetchData(url);
       setList(response?.data?.data);
       setListCount(response?.data?.totalCount);
    }

    const fetchLead = async(id)=>{
        var url = apiRoutes?.getPaginatedListLeadByListId+'?id='+id;
        if(watch('search')){
            url = url + '?search='+watch('search');
        }
        const response = await fetchData(url);
        setLead(response?.data?.data);
        setLeadCount(response?.data?.totalCount);
    }

    return {
        fetchList,
        list,
        setList,
        limit,
        setLimit,
        page,
        setPage,
        openModal,
        setModal,
        deleteModal,
        setDeleteModal,
        listCount,
        setListCount,
        leadCount,
        setLeadCount,
        lead,
        setLead,
        fetchLead
    }
}