import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import issueApi from './issueApi';

const initialState={
    issuesList:[],
    isLoading:false,
    isLoaded:false
}


export const loadIssueAsync=createAsyncThunk(
    'issue/loadIssue',
    async ()=>{
        const res=await issueApi.loadIssue();
      
        return res;
    }
)

export const addIssueAsync=createAsyncThunk(
    'issue/addIssue',
    async (issue,{rejectWithValue})=>{
        
            const res=await issueApi.addIssue(issue);
            
            return res;
       
    }
)
export const editIssueAsync=createAsyncThunk(
    'issue/editIssue',
    async (issue,{rejectWithValue})=>{
       
            const res=await issueApi.editIssue(issue);
            console.log("EDIT Issue1...........",res);

            if (!res.Issue && res.response.status===400) {
                return rejectWithValue(res);
              }
              return res;
        
    }
)
export const deleteIssueAsync=createAsyncThunk(
    'issue/deleteIssue',
    async (id,{rejectWithValue})=>{
       
            const res=await issueApi.deleteIssue({"id":id});
            
            return res;
        
    }
)



export const issueSlice=createSlice({
    name:'issue',
    initialState,
    reducers:{
       
    },
    // Map Object Notation
    extraReducers:{
        [loadIssueAsync.pending]:(state,action)=>{
            
            state.isLoading=true;
            state.isLoaded=false;
           
        },
        [loadIssueAsync.fulfilled]:(state,action)=>{
            
            state.isLoading=false;
            state.isLoaded=true;
            state.issuesList=action.payload;
            
        },
        [loadIssueAsync.rejected]:(state,action)=>{
           
            state.isLoading=false;
            state.isLoaded=false;
          
        },
        [editIssueAsync.pending]:(state,action)=>{
            // console.log("Edit Pending");
            state.isLoading=true;
            state.isLoaded=false;
            // state.isAuthenticated=false;
        },
        [editIssueAsync.fulfilled]:(state,action)=>{
            // console.log("Edit Success");
            state.isLoading=false;
            state.isLoaded=true;
            state.issuesList=action.payload;
            
        },
        [editIssueAsync.rejected]:(state,action)=>{
            // console.log("Edit Issue Failed");
            state.isLoading=false;
            state.isLoaded=false;
            console.log("Edit Failed",action.payload.response.data.msg);
            
        },
        [addIssueAsync.pending]:(state,action)=>{
            // console.log("Add Issue Pending");
            state.isLoading=true;
            state.isLoaded=false;
            // state.isAuthenticated=false;
        },
        [addIssueAsync.fulfilled]:(state,action)=>{
            // console.log("Add Issue Success");
            state.isLoading=false;
            state.isLoaded=true;
            state.issuesList.push(action.payload);
        },
        [addIssueAsync.rejected]:(state,action)=>{
            // console.log("Add Issue Failed");
            state.isLoading=false;
            state.isLoaded=false;
            
        },
        [deleteIssueAsync.pending]:(state,action)=>{
            // console.log("Delete Issue Pending");
            state.isLoading=true;
            state.isLoaded=false;
            
        },
        [deleteIssueAsync.fulfilled]:(state,action)=>{
            // console.log("Delete Success");
            state.isLoading=false;
            state.isLoaded=true;
            // state.isAuthenticated=false;
            state.issuesList=state.issuesList.filter(issue=>issue.id!==action.payload.Issue.id);
            // console.log("Delete Success",action.payload);
            
        },
        [deleteIssueAsync.rejected]:(state,action)=>{
            // console.log("Delete Failed");
            state.isLoading=false;
            state.isLoaded=false;
            
        }

    }
})

// export const {logout} =userSlice.actions;
export const selectIssues=(state)=>state.issue.issuesList;
// export const selectUser=(state)=>state.user.userinfo;

export default issueSlice.reducer;