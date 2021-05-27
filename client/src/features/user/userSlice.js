import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from './userApi';

const initialState={
   token:localStorage.getItem('token'),
    err:null,
    isLoading:false,
    isLoaded:false,
    isAuthenticated:false,
    isUpdate:null,
    userinfo:null,
    isBlocked:false
   
};


export const loadUserAsync=createAsyncThunk(
    'user/loadUser',
    async (_,{getState})=>{
        const res=await UserApi.loadUser(getState().user.token);
        // console.log("result thunk........Load",res);
        return res;
    }
)

export const addUserAsync=createAsyncThunk(
    'user/addUser',
    async (user,{rejectWithValue})=>{
        
            const res=await UserApi.registerUser(user);
            if (!res.token && res.response.status===400) {
                return rejectWithValue(res);
              }
              return res;
    }
)

export const loginUserAsync=createAsyncThunk(
    'user/loginUser',
    async (user,{rejectWithValue})=>{
        
            const res=await UserApi.loginUser(user);
            // console.log("Login Data3...",res);
            if (!res.token && res.response.status===400) {
                return rejectWithValue(res);
              }
              return res;
          
       
    }
        
    
)
export const logoutUserAsync=createAsyncThunk(
    'user/logoutUser',
    async (user,{rejectWithValue})=>{
        return {}
    }
)

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:state=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
            state.token=null;
            localStorage.removeItem('token')
        }
    },
    // Map Object Notation
    extraReducers:{
        [loadUserAsync.pending]:(state,action)=>{
            // state.token=localStorage.getItem('token');
            // console.log("User Loading");
            state.isLoading=true;
            state.isLoaded=false;
            state.isAuthenticated=false;
            // state.err=null;
        },
        [loadUserAsync.fulfilled]:(state,action)=>{
            // state.token=localStorage.getItem('token');
            // console.log("User Loaded");
            state.isLoading=false;
            state.isLoaded=true;
            state.isAuthenticated=true;
            state.userinfo=action.payload;
            state.err=null;
            console.log("UserAction",action);
        },
        [loadUserAsync.rejected]:(state,action)=>{
            // console.log("Failed To Load User");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
            // state.err=null;
        },
        [loginUserAsync.pending]:(state,action)=>{
            // console.log("Login Pending");
            state.isLoading=true;
            state.isLoaded=false;
            state.isAuthenticated=false;
            state.err=null;
        },
        [loginUserAsync.fulfilled]:(state,action)=>{
            console.log("Login Success");
            localStorage.setItem('token',action.payload.token);
            state.token=localStorage.getItem('token');
            state.isLoading=false;
            state.isLoaded=true;
            state.isAuthenticated=true;
            state.userinfo=action.payload;
            // console.log("Login Success",action);
            state.err=null;
            
        },
        [loginUserAsync.rejected]:(state,action)=>{
            console.log("Login Failed");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
            state.err=action.payload.response.data.msg;
            console.log("Login Failed",action.payload.response.data.msg);
        },
        [addUserAsync.pending]:(state,action)=>{
            // console.log("Register Pending");
            state.isLoading=true;
            state.isLoaded=false;
            state.isAuthenticated=false;
        },
        [addUserAsync.fulfilled]:(state,action)=>{
            // console.log("Register Success");
            state.isLoading=false;
            state.isLoaded=true;
            state.isAuthenticated=true;
            state.userinfo=action.payload.user;
            localStorage.setItem('token',action.payload.token);
           
            state.token=localStorage.getItem('token');
            state.err=null;
        },
        [addUserAsync.rejected]:(state,action)=>{
            // console.log("Register Failed");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
            state.err=action.payload.response.data.msg;
        },
        [logoutUserAsync.pending]:(state,action)=>{
            // console.log("Logout Pending");
            state.isLoading=true;
            state.isLoaded=false;
            state.isAuthenticated=false;
        },
        [logoutUserAsync.fulfilled]:(state,action)=>{
            // console.log("Logout Success");
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
            state.userinfo=action.payload;
            state.token=null;
            localStorage.removeItem('token')
           
        },
        [logoutUserAsync.rejected]:(state,action)=>{
            // console.log("Register Failed");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
        }

    }
})

export const {logout} =userSlice.actions;

export const selectAuthError=(state)=>state.user.err;
export const selectAuth=(state)=>state.user.isAuthenticated;
export const selectUser=(state)=>state.user.userinfo;

export default userSlice.reducer;