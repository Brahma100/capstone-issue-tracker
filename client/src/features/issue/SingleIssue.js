import { faArrowAltCircleLeft, faBlog, faCalendarAlt, faCartPlus, faChevronDown, faEdit, faHistory, faShoppingBag, faShoppingBasket, faStar,  faTrashAlt,  faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {  Button, Card, Col, Container, Dropdown, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import {  useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { selectAuth, selectUser } from '../user/userSlice';

import './SingleIssue.css';
import avatar from '../../assets/images/avatar.png'

const SingleIssue=(props)=>{
    console.log(props);
    // const dispatch=useDispatch();
    const issue=props.history.location.state.issue;
    const user=props.history.location.state.issue.user;
    const editUser=props.history.location.state.issue.editUser;

  

    const isAuthenticated=useSelector(selectAuth);


 

    useEffect(()=>{
      
        if(!isAuthenticated){
            console.log("From Product to Home");
            props.history.push('/')
          
           }
       
    
    },[props,isAuthenticated]);
    
    return(
     <>
 
        <div>
            <Container style={{marginTop:'1rem'}}>
               
                <Row>
                    <Col sm={3}>

                    <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}>
                     
                        <Card.Header><b><p>{issue.Issue}</p></b></Card.Header>
                      <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                                           
                       
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h7  style={{color:'rgb(252, 138, 62)',display: 'flex',margin:'0rem 0rem',fontWeight:'bold',fontSize:'12px'}}>Severity: {issue.Severity}</h7><br/>
                               
                            </Row>
                            <Row style={{display:'flex',fontSize:'12px'}}>
                            </Row>
                             <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display: 'flex'}}> <h7 style={{color:'#dbdbdb',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem',color:'rgb(252, 138, 62)'}}>Status:</b></h7><span style={{color:issue.Status.localeCompare("Open")===0?'#1bc943':'#f83245',borderRadius:'5px',border:issue.Status.localeCompare("Open")===0?'1px solid #1bc943':' 1px solid #f83245',padding:'.0rem .3rem'}}><b>{issue.Status}</b></span>
                            </div></Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:'flex'}}> <h7 style={{color:'#dbdbdb',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{color:'rgb(252, 138, 62)',marginRight:'.2rem'}}>Raised By:</b></h7><span><b>{issue.user?issue.user.fname:"Unknown"}</b></span>
                           </div> </Row>
                            <Row style={{display:'flex',alignItems:'center', fontSize:"12px"}}>
                                <h7 style={{display:'flex',color:'#dbdbdb',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faCalendarAlt}/><b style={{color:'rgb(252, 138, 62)',marginRight:'.2rem'}}>Created Date:</b><span>{issue.date}</span></h7>
                            </Row> 
                        </Card.Subtitle>
                       
                      </Card.Body>
                     
                      <div className="botto-button" style={{display:'flex',alignItems:'center'}} >
                       
                        

                        <NavLink 
                                to="/">
                        <OverlayTrigger
                                      placement="right"
                                      overlay={<Tooltip id="button-tooltip-2">Go Back</Tooltip>}>
                        <Button variant="primary" size="sm" style={{marginLeft:'1rem',marginBottom:'15px'}} ><FontAwesomeIcon style={{marginRight:'5px'}} icon={faArrowAltCircleLeft}/>Go Back</Button>
                        </OverlayTrigger>
                        </NavLink>
                        </div>
                    </Card>
                     
                    </Col>
                    <Col sm={6}>
                    <Card className="issue-card" style={{ margin:'1rem'}}>
                        <Card.Header>
                        <b><p>Issue Description</p></b>
                        </Card.Header>
                        <Card.Body>
                                <Row><h5 style={{fontSize:'14px',color:'white !important'}} className='description' >{issue.Description}</h5> </Row>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col sm={3}>
                            <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}> 
                                <Card.Header>
                                    <p style={{fontSize:'20px'}}><b>Created/Raised By</b></p>
                                </Card.Header>
                                <Card.Body style={{fontSize:'12px'}}>
                                           
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>Name:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.fname+" "+user.lname}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>Email:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.email}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>City:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.city}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>Postal:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.postal}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>Country:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.country}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#ff7a18'}}>Added Date:</b> <span style={{fontWeight:'bold',color:'#dbdbdb'}}>{ user.date}</span></h8>
                                                </Row>
                                           
                                </Card.Body>
                            </Card>
                    </Col>
                   
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col >
                        <Card>
                            <Card.Header style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><FontAwesomeIcon style={{color:'rgb(252, 138, 62)',marginBottom:'5px',marginRight:'8px'}} icon={faHistory}/><h5>Issue Logs</h5></div><div style={{display:'flex'}}><span style={{fontSize:'12px'}}> Closed Date:</span><span style={{fontSize:'14px',color:'rgb(252, 138, 62)'}}>{issue.r_date?issue.r_date:"Pending"}</span></div></Card.Header>
                            <Card.Body>
                              <Row>
                                    {
                                        editUser.map((eu,id)=>(
                                            <Col  style={{margin:'10px'}}>
                                                    <article class="card2">
                                                    <header class="card-header2">
                                                        <p>#{id+1}){eu.date}</p>
                                                        <span style={{fontSize:'14px',color:'gray'}}>Comments</span><h2>"{eu.Comments}"</h2>
                                                    </header>
                                            
                                                    <div class="card-author">
                                                        <a class="author-avatar" href="#">
                                                        <img src={avatar} />
                                                        </a>
                                                        <svg class="half-circle" viewBox="0 0 106 57">
                                                        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                                                        </svg>
                                            
                                                        <div class="author-name">
                                                        <div class="author-name-prefix">User</div>
                                                        {eu.user.fname+" "+eu.user.lname}
                                                        </div>
                                                    </div>
                                                    <div class="tags">
                                                        <a href="#">{eu.Status}</a>
                                                        <a href="#">{eu.Severity}</a>
                                                        
                                                    </div>
                                                    </article>
                                                    </Col>
                                            
                                        ))
                                    }
                               </Row>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
            </Container>
        </div>
     </>   
    )
}

export default SingleIssue ;