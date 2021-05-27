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
          
            state.isLoading=true;
            state.isLoaded=false;
           
        },
        [editIssueAsync.fulfilled]:(state,action)=>{
         
            state.isLoading=false;
            state.isLoaded=true;
            state.issuesList=action.payload;
            
        },
        [editIssueAsync.rejected]:(state,action)=>{
         
            state.isLoading=false;
            state.isLoaded=false;
            // console.log("Edit Failed",action.payload.response.data.msg);
            
        },
        [addIssueAsync.pending]:(state,action)=>{
           
            state.isLoading=true;
            state.isLoaded=false;
          
        },
        [addIssueAsync.fulfilled]:(state,action)=>{
          
            state.isLoading=false;
            state.isLoaded=true;
            state.issuesList.push(action.payload);
        },
        [addIssueAsync.rejected]:(state,action)=>{
           
            state.isLoading=false;
            state.isLoaded=false;
            
        },
        [deleteIssueAsync.pending]:(state,action)=>{
           
            state.isLoading=true;
            state.isLoaded=false;
            
        },
        [deleteIssueAsync.fulfilled]:(state,action)=>{
           
            state.isLoading=false;
            state.isLoaded=true;
          
            state.issuesList=state.issuesList.filter(issue=>issue.id!==action.payload.Issue.id);
           
            
        },
        [deleteIssueAsync.rejected]:(state,action)=>{
            // console.log("Delete Failed");
            state.isLoading=false;
            state.isLoaded=false;
            
        }

    }
})

export const selectIssues=(state)=>state.issue.issuesList;

export default issueSlice.reducer;