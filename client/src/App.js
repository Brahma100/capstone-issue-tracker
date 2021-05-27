import React, { useEffect,lazy } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectUser } from './features/user/userSlice';
import { loadIssueAsync } from './features/issue/issueSlice';
import './App.css';
import Loading from './components/LazyLoadingPage/Loading';
import { Suspense } from 'react';
import AboutUs from './components/AboutUs/AboutUs';
const AppNavbar=lazy(()=>import('./components/Navbar/AppNavbar'));
const Footer=lazy(()=>import('./components/Footer/Footer'));
const UserForm=lazy(()=>import('./features/user/UserForm'));
const Issues=lazy(()=>import('./features/issue/Issues/Issues'));
const IssueForm=lazy(()=>import('./features/issue/IssueForm/IssueForm'));
const EditIssue=lazy(()=>import('./features/issue/EditIssue/EditIssue'));
const SingleIssue=lazy(()=>import('./features/issue/SingleIssue'));



function App() {
  const dispatch=useDispatch();
  const isAuthenticated=useSelector(selectAuth);
  const user=useSelector(selectUser)

  useEffect(()=>{
    dispatch(loadIssueAsync());
  },[])

  return (
    <BrowserRouter>
    <div className="App">
    <Suspense fallback={<div><Loading/></div>}>
      <AppNavbar isAuthenticated={isAuthenticated} user={user}/>
      
      {/* <UserComponent/> */}
      <Route path="/login" component={UserForm}/>
      <Route exact path="/" component={Issues}/>
      <Route exact path="/issues" component={Issues}/>
      <Route exact path="/updateIssue" component={EditIssue}/>
      <Route exact path="/addIssue" component={IssueForm}/>
      <Route path="/issue" component={SingleIssue}/>
      <Route path="/aboutUs" component={AboutUs}/>
      {/* <UserForm/> */}
      <Footer/>
      </Suspense>
    </div>

    </BrowserRouter>
  );
}

export default App;
