
import React, { useContext } from "react";
import { useState,useEffect,createContext } from "react";
import UserListPage from "../components/userList/userList";
const contextdata=createContext(null)
export const useApi = () => useContext(contextdata);

export default function Createcontext(){
   
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const getUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            console.log(data)
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getUsers();  
    }, []);

    return<>
    <contextdata.Provider value={{users,loading}}>
           <UserListPage/> 
    </contextdata.Provider>
        
    </>
}