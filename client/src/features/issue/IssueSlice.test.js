import {issues, issues_after_delete} from './IssueTestData';
import reducer, {
  addIssueAsync,
  deleteIssueAsync,
 
  loadIssueAsync
} from './IssueSlice';

const payload={
  "issues":issues 
  
}

const payload_after_delete={
  "issues": issues_after_delete
}

 
describe('IssueSlice', () => {
  describe('loadIssueAsync', () => {

    const initialState={
      issuesList:[],
      isLoading:false,
      isLoaded:false
  }
    
    it('sets isLoading true when loadIssueAsync is pending', () => {
      const action = { type: loadIssueAsync.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        issuesList:[],
        isLoading:true,
        isLoaded:false
    });
    });

    it('sets the id and list when loadIssueAsync is fulfilled', () => {
      const action = { type: loadIssueAsync.fulfilled.type, payload:payload };
      const state = reducer(initialState, action);
      
      expect(state).toEqual({
        issuesList:payload,
        isLoading:false,
        isLoaded:true
    });
    });

    it('sets isLoading false when loadIssueAsync is rejected', () => {
        const action = { type: loadIssueAsync.rejected.type, payload: { error: 'some error' } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          issuesList:[],
          isLoading:false,
          isLoaded:false
      });
      });
  });

// Testing AddIssueAsync Reducers

  describe('AddIssueAsync Reducers', () => {

    const initialState={
      issuesList:payload.issues,
      isLoading:false,
      isLoaded:false
  }
    
    it('sets isLoading true when loadIssueAsync is pending', () => {
      const action = { type: addIssueAsync.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        issuesList:payload.issues,
        isLoading:true,
        isLoaded:false
    });
    });

    it('sets the id and list when addIssueAsync is fulfilled', () => {
      const action = { type: addIssueAsync.fulfilled.type, payload:{
        "id": "e576b71c-f4a3-4df2-8907-b9f07f56eae4",
        "Issue": "Passed All Test Cases",
        "Severity": "Minor",
        "Status": "Closed"
      } };
      const state = reducer(initialState, action);
      
      expect(state).toEqual({
        issuesList:[...payload.issues,{
          "id": "e576b71c-f4a3-4df2-8907-b9f07f56eae4",
          "Issue": "Passed All Test Cases",
          "Severity": "Minor",
          "Status": "Closed"
        }],
        isLoading:false,
        isLoaded:true
    });
    });

    it('sets isLoading false when addIssueAsync is rejected', () => {
        const action = { type: addIssueAsync.rejected.type, payload: { error: 'some error' } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          issuesList:payload.issues,
          isLoading:false,
          isLoaded:false
      });
      });
  });

  describe('deleteIssueAsync Reducers', () => {

    const initialState={
      issuesList:payload.issues,
      isLoading:false,
      isLoaded:false
  }
    
    it('sets isLoading true when deleteIssueAsync is pending', () => {
      const action = { type: deleteIssueAsync.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        issuesList:payload.issues,
        isLoading:true,
        isLoaded:false
    });
    });

    it('sets the id and list when deleteIssueAsync is fulfilled', () => {
      const action = { type: deleteIssueAsync.fulfilled.type, payload:{
        "Issue":{
          "id": "78c6c4a2688f45222549a962",
          "Issue": "Dependecy Issue on Loading Add to Cart Component",
          "Severity": "Minor",
          "Status": "Open"
        }
      } };
      const state = reducer(initialState, action);
      
      expect(state).toEqual({
        issuesList:payload_after_delete.issues,
        isLoading:false,
        isLoaded:true
    });
    });

    it('sets isLoading false when deleteIssueAsync is rejected', () => {
        const action = { type: deleteIssueAsync.rejected.type, payload: { error: 'some error' } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          issuesList:payload.issues,
          isLoading:false,
          isLoaded:false
      });
      });
  });

});







