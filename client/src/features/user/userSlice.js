import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from './userApi';

const initialState={
    // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiIyQGEuYSIsImlhdCI6MTYyMDIxNzA1NCwiZXhwIjoxNjIwMjIwNjU0fQ.7UKw_c4ZbDP1SJ3OFSJhfiipjbjgdqk2DyCI6w64xuo",
    token:localStorage.getItem('token'),
    isLoading:false,
    isLoaded:false,
    isAuthenticated:false,
    isUpdate:null,
    userinfo:null,
    isBlocked:false,
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
        // try{
            // console.log("AddUserAsync...........",user);
            const res=await UserApi.registerUser(user);
            // console.log("UsereSLice Register data :",res.data)
            return res;
        // }
        // catch{
        //     return rejectWithValue(error);
        // }
    }
)

export const loginUserAsync=createAsyncThunk(
    'user/loginUser',
    async (user,{rejectWithValue})=>{
        // try{

            const res=await UserApi.loginUser(user);

            return res;

        // }
        // catch{
        //     return rejectWithValue(error);
        // }
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
        },
        [loadUserAsync.fulfilled]:(state,action)=>{
            // state.token=localStorage.getItem('token');
            // console.log("User Loaded");
            state.isLoading=false;
            state.isLoaded=true;
            state.isAuthenticated=true;
            state.userinfo=action.payload;
            // console.log("UserAction",action);
        },
        [loadUserAsync.rejected]:(state,action)=>{
            // console.log("Failed To Load User");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
        },
        [loginUserAsync.pending]:(state,action)=>{
            // console.log("Login Pending");
            state.isLoading=true;
            state.isLoaded=false;
            state.isAuthenticated=false;
        },
        [loginUserAsync.fulfilled]:(state,action)=>{
            // console.log("Login Success");
            localStorage.setItem('token',action.payload.token);
            state.token=localStorage.getItem('token');
            state.isLoading=false;
            state.isLoaded=true;
            state.isAuthenticated=true;
            state.userinfo=action.payload;
            
            // console.log("UserAction",action);
        },
        [loginUserAsync.rejected]:(state,action)=>{
            // console.log("Login Failed");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
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
            // console.log("Register UserAction",action.payload);
            state.token=localStorage.getItem('token');
        },
        [addUserAsync.rejected]:(state,action)=>{
            // console.log("Register Failed");
            state.isLoading=false;
            state.isLoaded=false;
            state.isAuthenticated=false;
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
            // console.log("Logout UserAction",action);
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
export const selectAuth=(state)=>state.user.isAuthenticated;
export const selectUser=(state)=>state.user.userinfo;

export default userSlice.reducer;