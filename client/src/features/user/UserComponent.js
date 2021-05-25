import React,{ useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import userForm from './UserForm';
import { loadUserAsync,loginUserAsync,selectUser } from './userSlice';

export default function UserComponent(){
    const dispatch=useDispatch();
    const user=useSelector(selectUser);
    useEffect(()=>{
        dispatch(loadUserAsync());

    },[dispatch])    
    return(
        <>
        <h1>Hello {user?user.fname:'Guset'}</h1>
        <userForm/>
    </>
    )
}
// export default userComponent;