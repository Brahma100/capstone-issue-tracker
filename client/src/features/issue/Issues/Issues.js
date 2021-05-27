import React, { Component, useEffect, useState } from 'react';
import { OverlayTrigger,Tooltip,Accordion,DropdownButton, Spinner, Row, Container, Col, Card, Button, Form, Pagination, } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import './Issues.css'
import {NavLink, Prompt, withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt, faUser ,faShoppingBag,faCalendarAlt,faSearch,faFilter,  faChevronCircleDown, faChevronCircleRight, faArrowAltCircleUp, faArrowAltCircleDown, faEdit, faPlus, faExclamationTriangle, faCubes, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import { deleteIssueAsync, loadIssueAsync } from '../issueSlice';
import {selectIssues} from '../issueSlice';
import { selectAuth, selectAuthError } from '../../user/userSlice';
import NotificationSystem from 'react-notification-system';
import ChartistGraph from "react-chartist";
import Chart_card from '../../../components/Card/Chart_card';
import TrendingIssues from '../TrendingIssue/TrendingIssues';



const styles = {
  mediaItem: {
    border: "1px solid white",
    backgroundColor: "#f5f5f5",

  },
  mediaItemButtons: {
    paddingTop: "5px",
    paddingBottom: "5px"
  }
};

function Issues(){
  const dispatch=useDispatch();
  
  const createLegend=(json)=> {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  
  useEffect(()=>{
    dispatch(loadIssueAsync());
  },[])

  const [isStatus,setIsStatus]=useState(true);
  const [isSeverity,setIsSeverity]=useState(true);
  const [isDate,setIsDate]=useState(true);
  const [isAddedBy,setIsAddedBy]=useState(true);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);

  const issues=useSelector(selectIssues)
  const isAuthenticated=useSelector(selectAuth);
  const [pageOfItems,setPageOfItems]=useState([]);
  const [productsPerPage,setProductsPerPage]=useState(6);
  const [isAscending,setIsAscending]=useState(false);
  const [isDecending,setIsDecending]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [q,setQ]=useState("");
  const [isBlocked,setIsBlocked]=useState(false);
  const notificationSystem = React.createRef();
  const err=useSelector(selectAuthError);
 

  const  legendPie = {
    names: ["Closed", "In Progress", "Open"],
    types: ["success", "primary","danger"]
  };

var open=0;

var closed=0;
var inProgress=0;
// var lowStock=1;
for(var i=0;i<issues.length;i++)
{

  if(issues[i].Status==='Open')
  open++;
  else if(issues[i].Status==='Closed')
  closed++;
  else if(issues[i].Status==='In Progress')
  inProgress++;
}
var total=issues.length;
// console.log(open,closed,inProgress,total);

    var dataPie1 = {
      labels: [parseInt(closed/total*100)+"%", parseInt(inProgress/total*100)+"%",parseInt(open/total*100)+"%"],
      series: [closed, inProgress, open]
    };


  const addNotification = msg => {
    const notification = notificationSystem.current;
    notification.addNotification({
      title:<div><FontAwesomeIcon icon={faExclamationTriangle}/> Hurray, Now You Got Full Access</div>,
      message:  msg,
      level: 'success',
      position:'tc',
      autoDismiss:5
    });
  };

 const handleClick=(event)=> {
setCurrentPage(Number(event.target.id));
  }



      const paginaton=(products)=>{
        if(products.length===0)return [];
        const indexOfLastTodo = currentPage * productsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
        return products.length>0 && products.slice(indexOfFirstTodo, indexOfLastTodo);
      }

      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(  issues.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item onClick={handleClick} id={number} key={number} active={number === currentPage}>
          {number}          
        </Pagination.Item>
        
      );
    });
      
      const sort=(products)=>{
       
         if(  isAscending ){
         
           return products.sort((a, b) => a.price - b.price)
          }
          else if(  isDecending ){
         
            return products.sort((a, b) => b.price - a.price)
        }
      return products;
}


      const Search=(products)=>{    
        return (products.length>0 && products.filter(issue=>
                issue.Issue.toLowerCase().indexOf(  q.toLowerCase())!==-1 || 
               
                issue.Severity.toLowerCase().indexOf(  q.toLowerCase())!==-1 ||
                issue.Status.toLowerCase().indexOf(  q.toLowerCase())!==-1

                ));

        }
    
var user=  user;




        return (
            <>
             <NotificationSystem role="notification" ref={notificationSystem} />
<div>
   
    
    <Container  style={{paddingTop:'2rem',width:'100%'}}>

          <div  className="content">

          {isAuthenticated?null:
          <Prompt message={(location, action) => {
            if (action === 'POP') {
              // console.log("Backing up...")
            }

            return location.pathname.startsWith("/updateIssue")
              ? `You Have to Login to Edit Issue`
              : true 
          }}/>

          }

        
            <Row>
              <Col md={8}>
              <TrendingIssues/>
              </Col>
              <Col md={4}>

              <Chart_card
              icon={faThumbtack}
                statsIcon="fa fa-clock-o"
                title="Issue Chart"
                category="Average Performance of Status"
                stats="Updated Now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie1} type="Pie"  />
                  </div>
                }
                legend={
                  <div className="legend">{createLegend(legendPie)}</div>
                }
              />
              </Col>
            </Row>
        
        

          { issues.length===0?<><Spinner style={{ width: '3rem', height: '3rem', color:'green' }} type="grow" /></>
               :<>

                <Container  className="filter-box" >
                  
                  <Row style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  
                          <Col sm={4} style={{display:'flex',alignItems:'center', width:'70%',color:'gray',paddingLeft:'.4rem',borderRadius:'20px',border:'1px solid white',margin:'5px'}}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                    <input onChange={(e)=>{ setQ(e.target.value)}} style={{width:'90%',border:'none',padding:'.2rem 0 .2rem.5rem',color:'black'}} placeholder="Search Issues" type="text"/>
                                    {isAuthenticated?
                         
                                <NavLink 
                                to="/addIssue">
                                  <OverlayTrigger
                                      placement="right"
                                      overlay={<Tooltip id="button-tooltip-2">Add Issue</Tooltip>}>
                                      <Button className='add-issue-button' variant="primary" size="sm"  ><FontAwesomeIcon icon={faPlus}/></Button>
                                    </OverlayTrigger>
                                  </NavLink>
                        
                          
                          :null}
                         
                          </Col>


                          
                                
                             
                            
                      

                          
                          <Col style={{}} sm={2} className='filter-icon'>
                            
                                  <DropdownButton  title={<FontAwesomeIcon icon={faFilter} />} className='filter-button' style={{borderRadius:'50%',background:'transparent',color:'#3c44b1 ',border:'none',boxShadow:'none'}}> 
                                        
                                        {/* <Row > */}
                                        <div >
                 <Card className="filter-card" >

                
                    <Card.Body className="filter-body" style={{width:'15rem',padding:'0rem'}}>
                       
                            <Accordion defaultActiveKey="1">

                            <Card>
                            <Accordion.Toggle  style={{background:!  open2?"":'',color:"white"}} eventKey="1" onClick={()=> setOpen2(!open2)}>
                                    <div className="accordion-header"><h6>Customize Columns</h6><FontAwesomeIcon style={{color:  open2?"#d43434":"#22d522d4"}} icon={  open2?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={  isSeverity} onChange={()=> setIsSeverity(!isSeverity)}/><h6>Severity</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={  isStatus} onChange={()=> setIsStatus(!isStatus)}/><h6>Status</h6></Col></Row>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={ isAddedBy} onChange={()=> setIsAddedBy(!isAddedBy)}/><h6>Added By</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isDate} onChange={()=> setIsDate(!isDate)}/><h6>Date</h6></Col></Row>
                                   
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>


                            
                </Card.Body>   
                           
                         
                           </Card>
                           </div>
                                     
                                </DropdownButton>
                          </Col>
      
                  </Row>
                  
                </Container>
                 
                  <Row style={{marginTop:'1rem'}} >
                
                  {issues.length>0?paginaton(sort(Search(issues))).map((issue,id)=>(
                    <Col m-8 key={issue.id}>
                  <Card className="issue-card" style={{ width:'19rem',margin:'1rem'}}>
                      <NavLink  to={isAuthenticated?{
                    pathname:'issue',//`issues/${issue.id}`,
                    state: {issue:issue} }:'/login'}
                    >
                        <Card.Header><b><p>#{id+1+(currentPage-1)*6}) {issue.Issue}</p></b></Card.Header>
                      <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                                           
                       
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h7  style={{display:  isSeverity?'flex':'none',margin:'0rem 0rem',color:'rgb(252, 138, 62)',fontWeight:'bold',fontSize:'12px'}}>Severity: {issue.Severity}</h7><br/>
                                
                             
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
                      <Button variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{dispatch(deleteIssueAsync(issue.id))}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                      </OverlayTrigger>
                        :
                        <div>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
                                
                        <Button disabled variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{dispatch(deleteIssueAsync(issue.id))}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                            
                        </OverlayTrigger>
                    </div>
                        
                        
                        
                        
                          }
                        </div>
                    </Card>
                    </Col>
                  )):null}
                  
                </Row>
                  </>} 
                
           
            
         </div>
         <div role="pagination" style={{justifyContent:'space-around',display:'flex',alignItems:'center'}}>
         <Pagination >
           {renderPageNumbers}
         </Pagination>
         
      </div>
      </Container>
      
    
     
      </div>
       
      
           
            </>
          );
    }
  




export default (withRouter(Issues));