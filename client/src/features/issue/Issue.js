import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faStar, faTrashAlt, faUser ,faShoppingBag,faCalendarAlt,faSearch,faFilter,  faChevronCircleDown, faChevronCircleRight, faArrowAltCircleUp, faArrowAltCircleDown, faEdit, faPlus, faExclamationTriangle, faCubes, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger,Tooltip,Accordion,DropdownButton, Spinner, Row, Container, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Issue=(props)=>{


const {user,isStatus,isSeverity,isDate,isAddedBy,currentPage,isAuthenticated,issue,deleteIssue,id}=props;

    return(
        <Col m-8 key={issue.id}>
        <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}>
            <NavLink  to={isAuthenticated?{
          pathname:'issue',//`issues/${issue.id}`,
          state: {issue:issue} }:'/login'}
          >
              <Card.Header><b><p>#{id+1+(currentPage-1)*6}) {issue.Issue}</p></b></Card.Header>
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
                   
                      <h7  style={{display:  isSeverity?'flex':'none',margin:'0rem 0rem',color:'rgb(252, 138, 62)',fontWeight:'bold',fontSize:'12px'}}>Severity: {issue.Severity}</h7><br/>
                      {/* <p style={{display:  isStatus?'':'none',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{issue.rating?issue.rating:"0"} <FontAwesomeIcon  icon={faStar}/></p>  */}
                   
                  </Row>
                  <Row style={{display:'flex',fontSize:'12px'}}>
                  </Row>
                   <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                     <div style={{display:  isStatus?'flex':'none'}}> <h7 style={{color:'white',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{color:'rgb(252, 138, 62)',marginRight:'.2rem'}}>Status:</b></h7><span style={{color:issue.Status.localeCompare("Open")===0?'#1bc943':'rgb(252 102 116) ',borderRadius:'5px',border:issue.Status.localeCompare("Open")===0?'1px solid #1bc943':' 1px solid #f83245',padding:'.0rem .3rem'}}><b>{issue.Status}</b></span>
                  </div></Row>
                  <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                     <div style={{display:  isAddedBy?'flex':'none'}}> <h7 style={{color:'white',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{color:'rgb(252, 138, 62)',marginRight:'.2rem'}}>Raised By:</b></h7><span><b>{issue.user?issue.user.fname+" "+issue.user.lname :"Unknown"}</b></span>
                 </div> </Row>
                  <Row style={{display:'flex',alignItems:'center', fontSize:"12px"}}>
                      <h7 style={{display:isDate?'flex':'none',color:'white',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faCalendarAlt}/><b style={{color:'rgb(252, 138, 62)',marginRight:'.2rem'}}>{issue.r_date?"Resolve Date:":"Created Date:"}</b><span style={{color:'white'}}>{issue.r_date?issue.r_date:issue.date}</span></h7>
                  </Row> 
              </Card.Subtitle>
             
            </Card.Body>
            </NavLink>
            <div className="bottom-button" >
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
                          state: {issue:issue,user:user} 
                        }}>
                           <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip id="button-tooltip-2">Edit Issue</Tooltip>}>
                            <Button variant="primary" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faEdit}/></Button>
                            </OverlayTrigger>
                        </NavLink>
              </>}
              

            {isAuthenticated?
             <OverlayTrigger
             placement="right"
             overlay={<Tooltip id="button-tooltip-2">Delete Issue</Tooltip>}>
            <Button variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={deleteIssue(issue.id)}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
            </OverlayTrigger>
              :
              <div>
              <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
                      
              <Button disabled variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={deleteIssue(issue.id)}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                  
              </OverlayTrigger>
          </div>
              
                }
              </div>
          </Card>
          </Col>
    )
}
export default Issue;