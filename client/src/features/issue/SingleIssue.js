import { faAlignLeft, faArrowAltCircleLeft, faCalendarAlt, faCartPlus, faChevronDown, faEdit, faShoppingBag, faShoppingBasket, faStar,  faTrashAlt,  faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Dropdown, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory,useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import { selectAuth, selectUser } from '../user/userSlice';
import { deleteIssueAsync } from './issueSlice';
// import './SingleIssue.css';
import avatar from '../../assets/images/avatar.png'

const SingleIssue=(props)=>{
    console.log(props);
    const dispatch=useDispatch();
    const issue=props.history.location.state.issue;
    const user=props.history.location.state.issue.user;
    console.log("Cretaed User.....",user);

    const isAuthenticated=useSelector(selectAuth);
  
    var params=useParams();

    const userinfo= useSelector(selectUser);

      const [msg,setMsg]=useState(null);
      const [isBlocking,setIsBlocking]=useState(false);
      const [Id,setId]=useState(issue.id); 
      const [Issue,setIssue]=useState(issue.Issue); 
      const [Severity,setSeverity]=useState(issue.Severity); 
      const [Status,setStatus]=useState(issue.Status); 


 

    useEffect(()=>{
      
        if(!isAuthenticated){
            console.log("From Product to Home");
            props.history.push('/')
          
           }
        //    else{
        // setItem(history.location.state.item);
        // // console.log("Items",history.location.state.item);
        // // console.log("User",history.location.state.user);
        // props.rankItem({id:history.location.state.item.id});
    
    },[props,isAuthenticated]);
    // useEffect(()=>{
    //     //       if(parseInt(localStorage.getItem(history.location.state.item.id))!==parseInt(history.location.state.user._id)){
    //             // console.log("User1",history.location.state.user._id,localStorage.getItem(history.location.state.item.id));
    //     //         localStorage.setItem(history.location.state.item.id,history.location.state.user._id);
               
    //     //     }
            
    //       },[]);
    return(
     <>
 
        <div>
            <Container style={{marginTop:'1rem'}}>
                {/* <Row>
                    <Card><h1>{params.name}</h1></Card>
                </Row> */}
                <Row>
                    <Col sm={5}>

                    <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}>
                     
                        <Card.Header><b><p>{issue.Issue}</p></b></Card.Header>
                      <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                                           
                        {/* <Card.Title><b>{issue.Issue}</b></Card.Title> */}
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        {/* <Row>
                                <span style={{color:'#3b44c1',fontSize:'.8rem'}}>{issue.manufacturer}</span>
                            </Row> */}
                            {/* <Row>
                                <h3 style={{margin:'0rem'}}>{issue.Issue}</h3 >
                            </Row> */}
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h7  style={{display: 'flex',margin:'0rem 0rem',fontWeight:'bold',fontSize:'12px'}}>Severity: {issue.Severity}</h7><br/>
                                {/* <p style={{display:  isStatus?'':'none',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{issue.rating?issue.rating:"0"} <FontAwesomeIcon  icon={faStar}/></p>  */}
                             
                            </Row>
                            <Row style={{display:'flex',fontSize:'12px'}}>
                            </Row>
                             <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display: 'flex'}}> <h7 style={{color:'gray',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem'}}>Status:</b></h7><span style={{color:issue.Status.localeCompare("Open")===0?'#1bc943':'#f83245',borderRadius:'5px',border:issue.Status.localeCompare("Open")===0?'1px solid #1bc943':' 1px solid #f83245',background:issue.stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem'}}><b>{issue.Status}</b></span>
                            </div></Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:'flex'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{marginRight:'.2rem'}}>Raised By:</b></h7><span><b>{issue.user?issue.user.fname:"Unknown"}</b></span>
                           </div> </Row>
                            <Row style={{display:'flex',alignItems:'center', fontSize:"12px"}}>
                                <h7 style={{display:'flex',color:'gray',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faCalendarAlt}/><b style={{marginRight:'.2rem'}}>Created Date:</b><span>{issue.date}</span></h7>
                            </Row> 
                        </Card.Subtitle>
                       
                      </Card.Body>
                     
                      <div className="bottom-button" style={{display:'flex',alignItems:'center'}} >
                        {/* <UpdateProductModal isAuthenticated={  isAuthenticated} issue={issue}/> */}
                        
                        {!isAuthenticated?<>
                          <NavLink 
                                to="/login">
                                      <Button variant="primary" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faEdit}/></Button>
                                  </NavLink>
                        
                        </>:<>
                        
                        <NavLink 
                                to={{
                                    pathname:'/updateIssue',
                                    state: {issue:issue,user:userinfo} 
                                  }}>
                                     <OverlayTrigger
                                      placement="left"
                                      overlay={<Tooltip id="button-tooltip-2">Edit Issue</Tooltip>}>
                                      <Button variant="primary" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faEdit}/></Button>
                                      </OverlayTrigger>
                                  </NavLink>
                        </>}

                        <NavLink 
                                to="/">
                        <OverlayTrigger
                                      placement="right"
                                      overlay={<Tooltip id="button-tooltip-2">Go Back</Tooltip>}>
                        <Button variant="danger" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faArrowAltCircleLeft}/></Button>
                        </OverlayTrigger>
                        </NavLink>
                        </div>
                    </Card>
                     
                    </Col>
                    <Col sm={5}>
                            <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}> 
                                <Card.Header>
                                    <p style={{fontSize:'20px'}}><b>Created/Raised By</b></p>
                                </Card.Header>
                                <Card.Body style={{fontSize:'12px'}}>
                                           
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>Name:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.fname+" "+user.lname}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>Email:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.email}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>City:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.city}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>Postal:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.postal}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>Country:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.country}</span></h8>
                                                </Row>
                                                <Row>
                                                    <h8><b style={{color:'#3c44b1'}}>Added Date:</b> <span style={{fontWeight:'bold',color:'gray'}}>{ user.date}</span></h8>
                                                </Row>
                                           
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col sm={4}>
                        
                        
                    </Col>
                </Row>
            </Container>
        </div>
     </>   
    )
}

export default SingleIssue ;