import React, { useEffect,lazy } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Router} from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectUser } from './features/user/userSlice';
import { loadIssueAsync } from './features/issue/issueSlice';
import './App.css';
// const Dashboard = lazy(() => import('./components/views/Dashboard'));
import UserComponent from './features/user/UserComponent';
import Loading from './components/LazyLoadingPage/Loading';
import { Suspense } from 'react';
const AppNavbar=lazy(()=>import('./components/Navbar/AppNavbar'));
const Footer=lazy(()=>import('./components/Footer/Footer'));
const UserForm=lazy(()=>import('./features/user/UserForm'));
const Issues=lazy(()=>import('./features/issue/Issues'));
const IssueForm=lazy(()=>import('./features/issue/IssueForm'));
const EditIssue=lazy(()=>import('./features/issue/EditIssue'));
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
      {/* <UserForm/> */}
      <Footer/>
      </Suspense>
    </div>

    </BrowserRouter>
  );
}

export default App;
