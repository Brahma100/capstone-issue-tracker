import React, {Fragment, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav,Container,Dropdown, Button} from 'react-bootstrap';
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './AppNavbar.css'
import {useSelector,useDispatch} from 'react-redux'
import { loadUserAsync, selectAuth, selectUser } from '../../features/user/userSlice';
import Logout from '../../features/user/Logout';


function AppNavbar(){
  const [dropdownOpen,setDropDownOpen]=useState(false);
  const [isopen,setIsopen]=useState(false);


    const toggle=()=>{
        setIsopen(!isopen);
       
    }
    const toggled=()=>{
        setDropDownOpen(!dropdownOpen);
        
    }
  
      
    const dispatch=useDispatch();
    const user=useSelector(selectUser);
    const isAuthenticated=useSelector(selectAuth);

    useEffect(()=>{
      
            dispatch(loadUserAsync())
  
        console.log("ReRender The AppNavBar.............................");
    }
    ,[])

        console.log("from Nav:",user?user:'Hello');
        const authLinks=(
            <Fragment >
                {/* <Nav.Item>About</Nav.Item> */}
                <Nav.Item>
                    
                <Dropdown className="user-dropdown" style={{padding:'0rem !important'}} isopen={ dropdownOpen} toggle={ toggled}>
                    
                    <Dropdown.Toggle id="dropdown-basic" caret>
                        {user && isAuthenticated? <div className="user-avatar">
                        <img alt="alt" className="avatar" style={{width:'2rem',borderRadius:'50%'}} src={user.img?user.img:avatar} />
                        <div class="status-overlay">
                            <i class="bowtie-icon bowtie-status-success success"></i>
                        </div>
                        </div>:'Guest'}
                    <div>
                        <span style={{color:'#9da59a',fontWeight:400,fontSize:'80%'}}>Admin</span>
                        <div style={{color:'#ff7a18',fontWeight:'bold'}}>{user? user.fname+" "+user.lname:'Hello Gest'}</div>
                    </div>
                   
                    
                    </Dropdown.Toggle>
                    <Dropdown.Menu bottom>
                            <Dropdown.Item header>
                            {user? <div className="user-avatar">
                    <img alt="alt" className="avatar" style={{width:'2rem',borderRadius:'50%'}} src={user.img?user.img:avatar} />
                    {/* <div class="status-overlay">
                        <i class="bowtie-icon bowtie-status-success success"></i>
                    </div> */}
                    </div>:'X'}
                    <div>
                        <span style={{color:'red',fontWeight:400,fontSize:'80%'}}>Tracker Admin</span>
                        <div style={{color:'rgb(187 187 187)'}}>{user? user.email:'Hello Guest'}</div>
                    </div>
                            </Dropdown.Item><hr/>
                             <Dropdown.Item className="dropdown-list-nav"> <Nav.Item  >
                            <div className="dropdown-list-item">
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faCog}/><h7>Settings</h7>    
                            </div>    
                    </Nav.Item></Dropdown.Item>
                             <Dropdown.Item className="dropdown-list-nav" > <Nav.Item >
                               <NavLink to="/admin/user">
                            <div className="dropdown-list-item">
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faUserEdit}/><h7>Profile</h7>    
                            </div>    
                            </NavLink> 
                    </Nav.Item></Dropdown.Item>
                    <Dropdown.Item> <Nav.Item ><Logout/></Nav.Item></Dropdown.Item>
                   
                    </Dropdown.Menu>
                   
                </Dropdown>
   
                </Nav.Item>    
            </Fragment>
        );
        const guestLinks=(
            <Fragment>
                <Nav.Item>
                   
                <NavLink to={{pathname:'/login',state:'button'}}
                 >
               <Button style={{paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b> Register</b></Button>
            </NavLink>

                   
                </Nav.Item>
                <Nav.Item>
                        <NavLink onClick={ toggle} to='/aboutUs'>
                    <       Button className="about-btn" style={{paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b> About</b></Button>
                        </NavLink>
                </Nav.Item>
                {/* <Nav.Item>
                    <LoginModal/>
                </Nav.Item> */}
            </Fragment>
        );
        return(
            <>
            <div  style={{color:'#000',textDecoration:'none'}}>
            <Navbar expand="sm" bg="dark"> 
                <Container>
                    <Navbar.Brand ><NavLink to='/'><div className="nav-brand"><img alt="alt" className="nav-logo" src={logo}/><div className="brand-text"><span><b>Ticket</b></span><b>TrackerZ</b></div></div></NavLink></Navbar.Brand>
                    <Navbar.Toggle bg='light' variant='dark' onClick={ toggle}/>
                    <Navbar.Collapse  className="mainNavCollapse" isopen={ isopen} navbar>
                        <NavLink  style={{marginLeft:"auto"}} to='/'><b>Home</b></NavLink>
                        {/* <NavLink  href='/admin/dashboard'><b>Dashboard</b></NavLink> */}
                        {/* <NavLink className="ml-3 mr-3" to='/issues'><b>Issues</b></NavLink> */}
                        <Nav  className="justify-content-center" >
                        {isAuthenticated ?authLinks:guestLinks}    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
       </>
        );
    }


export default AppNavbar;