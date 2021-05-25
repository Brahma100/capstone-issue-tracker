import reducer, {
  addIssueAsync,
  deleteIssueAsync,
  editIssueAsync,
  loadIssueAsync
} from './IssueSlice';

const payload={
  "issues": [
    {
      "id": 1,
      "Issue": "On Cliking Delete, the application crashes.",
      "Severity": "Critical",
      "Status": "Open"
    },
    {
      "id": "bc40b651-58ce-4d7b-b916-56770dbd451c",
      "Issue": "Testing",
      "Severity": "Minor",
      "Status": "Open"
    },
    {
      "id": "01db0133-e90f-4c2c-a003-b9778e260140",
      "Issue": "Dependecy Issue on Loading Add to Cart Component",
      "Severity": "Minor",
      "Status": "Open"
    }
  ]
}

const payload_after_delete={
  "issues": [
    {
      "id": 1,
      "Issue": "On Cliking Delete, the application crashes.",
      "Severity": "Critical",
      "Status": "Open"
    },
    {
      "id": "bc40b651-58ce-4d7b-b916-56770dbd451c",
      "Issue": "Testing",
      "Severity": "Minor",
      "Status": "Open"
    }
  ]
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

// Testing EditIssueAsync Reducers

  describe('editIssueAsync Reducers', () => {

    const initialState={
      issuesList:payload.issues,
      isLoading:false,
      isLoaded:false
  }
    
    it('sets isLoading true when editIssueAsync is pending', () => {
      const action = { type: editIssueAsync.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        issuesList:payload.issues,
        isLoading:true,
        isLoaded:false
    });
    });

    it('sets the id and list when editIssueAsync is fulfilled', () => {
      const action = { type: editIssueAsync.fulfilled.type, payload:{
        // "Issue":{
          "id": "01db0133-e90f-4c2c-a003-b9778e260140",
          "Issue": "Unknown Issue on Loading Add to Cart Component",
          "Severity": "Minor",
          "Status": "Closed"
        // }
      } };
      const state = reducer(initialState, action);
      
      expect(state).toEqual({
        issuesList:{"id": "01db0133-e90f-4c2c-a003-b9778e260140",
        "Issue": "Unknown Issue on Loading Add to Cart Component",
        "Severity": "Minor",
        "Status": "Closed"},
        isLoading:false,
        isLoaded:true
    });
    });

    it('sets isLoading false when editIssueAsync is rejected', () => {
        const action = { type: editIssueAsync.rejected.type, payload: { error: 'some error' } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          issuesList:payload.issues,
          isLoading:false,
          isLoaded:false
      });
      });
  });

// Testing DeleteIssueAsync Reducers

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
          "id": "01db0133-e90f-4c2c-a003-b9778e260140",
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











































// import { store } from '../../app/store';
// import { loadIssueAsync } from './issueSlice';
// // import { updateToDo } from '../issueSlice';

// store.dispatch(loadIssueAsync());

// test('IssueList test', () => {
    
//     let issues = store.getState().issue.issuesList;
//     console.log("Issues............",store.getState().issue.issuesList);
//     const originalIssue = issues.find((p) => p.id === 1);
//     expect(originalIssue?.Severity).toBe('Critical');
//     expect(originalIssue?.Status).toBe('In Progress ');
//     expect(originalIssue?.Issue).toBe('On Cliking Delete, the application crashes');
   
//     // store.dispatch(updateToDo({ toDoId: 1, isComplete: false }));
//     // state = store.getState().toDo;
//     // let changedToDo = state.toDoList.find((p) => p.toDoId === 1);
//     // expect(changedToDo?.isComplete).toBeFalsy();
   
//     // store.dispatch(updateToDo({ toDoId: 1, description: 'be merry' }));
//     // state = store.getState().toDo;
//     // changedToDo = state.toDoList.find((p) => p.toDoId === 1);
//     // expect(changedToDo?.description).toBe('be merry');
   
//     // store.dispatch(
//     //   updateToDo({ toDoId: 1, description: 'eat tacos', isComplete: true }),
//     // );
//     // state = store.getState().toDo;
//     // const backToOriginalToDo = state.toDoList.find((p) => p.toDoId === 1);
   
//     // // snapshots can be objects
//     // expect(backToOriginalToDo).toMatchInlineSnapshot(`
//     //   Object {
//     //     "description": "eat tacos",
//     //     "isComplete": true,
//     //     "profileId": 1,
//     //     "toDoId": 1,
//     //   }
//     // `);
   
//     // // deep object equality
//     // expect(backToOriginalToDo).toEqual(originalToDo);
//   });