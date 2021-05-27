
import reducer, {
  loginUserAsync,
  loadUserAsync
} from './userSlice';


 
describe('UserSlice', () => {
  describe('loginUserAsync', () => {

    const initialState={
        token:null,
        err:null,
        isLoading:false,
        isLoaded:false,
        isAuthenticated:false,
        isUpdate:null,
        userinfo:null,
        isBlocked:false
  }
    
    it('Sets isLoading true when LoginUserAsync is pending', () => {
      const action = { type: loginUserAsync.pending.type,payload:{"email":"1@a.a","password":"aaaaaa"} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        token:localStorage.getItem('token'),
        err:null,
        isLoading:true,
        isLoaded:false,
        isAuthenticated:false,
        isUpdate:null,
        userinfo:null,
        isBlocked:false
    });
    });

    it('Sets UserInfo, isLoaded when loginUserAsync is fulfilled', () => {
      const action = { type: loginUserAsync.fulfilled.type, payload:{"email":"1@a.a","password":"aaaaaa"} };
      const state = reducer(initialState, action);
      
      expect(state).toEqual({ 
        "err":null,
        "isLoading":false,
        "isLoaded":true,
        "isBlocked":false,
        "isAuthenticated":true,
        "isUpdate":null,"token": "undefined",  "userinfo": {"email": "1@a.a", "password": "aaaaaa"}
        })
        
    
    });
  });

  describe('loadUserAsync', () => {

    const initialState={
        token:localStorage.getItem('token'),
        err:null,
        isLoading:false,
        isLoaded:false,
        isAuthenticated:false,
        isUpdate:null,
        userinfo:null,
        isBlocked:false
  }
    
    it('sets isLoading true when loadUserAsync is pending', () => {
      const action = { type: loadUserAsync.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        token:null,
        err:null,
        isLoading:true,
        isLoaded:false,
        isAuthenticated:false,
        isUpdate:null,
        userinfo:null,
        isBlocked:false
    });
    });

    it('sets isLoading false when loadUserAsync is rejected', () => {
        const action = { type: loadUserAsync.rejected.type, payload: { error: 'some error' } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            token:null,
            err:null,
            isLoading:false,
            isLoaded:false,
            isAuthenticated:false,
            isUpdate:null,
            userinfo:null,
            isBlocked:false
      });
      });
  });


});

















