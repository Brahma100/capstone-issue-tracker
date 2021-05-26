import React, { Component, useEffect, useState } from 'react';
import { OverlayTrigger,Tooltip,Accordion,DropdownButton, Spinner, Row, Container, Col, Card, Button, Form, Pagination, } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import './Issues.css'
import {NavLink, Prompt, withRouter} from 'react-router-dom';
import back from '../../assets/images/back.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt, faUser ,faShoppingBag,faCalendarAlt,faSearch,faFilter,  faChevronCircleDown, faChevronCircleRight, faArrowAltCircleUp, faArrowAltCircleDown, faEdit, faPlus, faExclamationTriangle, faCubes, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import { deleteIssueAsync, loadIssueAsync } from './issueSlice';
import {selectIssues} from './issueSlice';
import { selectAuth, selectAuthError } from '../user/userSlice';
import NotificationSystem from 'react-notification-system';
import ChartistGraph from "react-chartist";
import Chart_card from '../../components/Card/Chart_card';
import TrendingIssues from './TrendingIssues';



const styles = {
  mediaItem: {
    border: "1px solid #b1b1b1",
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
  // const [issues,setIssues]=useState(null);

  const  legendPie = {
    names: ["High", "Trending", "Zero","Low"],
    types: ["success", "primary","danger", "info"]
  };
var highStock=10;
var trending=5;
var OutOfStock=2;
var lowStock=1;
  var total=highStock+ trending+ OutOfStock+lowStock;
// const total=100
    var dataPie1 = {
      labels: [parseInt(highStock/total*100)+"%", parseInt(trending/total*100)+"%",parseInt(OutOfStock/total*100)+"%",parseInt(lowStock/total*100)+"%"],
      series: [highStock, trending, OutOfStock,lowStock]
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
console.log("Id:",event.target.id);
setCurrentPage(Number(event.target.id));
    //  setState({
    //   currentPage: Number(event.target.id)
    // });
  }

// componentWillUnmount(){
//   console.log("Blocked:",  isBlocked);
//     console.log("History:",  history);
//     if(  isBlocked){
//           let authenticate = window.confirm("Are You Sure Want To Go ",  history.location.pathname)
//           if(!authenticate){
//                     history.push(  history.location.pathname)
//           }
//     }
// }


useEffect(
  function(e){
    // if(isAuthenticated && !err){
    //   addNotification("Login Success");
    // }

  }

,[isAuthenticated,err]);

  const handleView=()=>{
    if(!  isAuthenticated){
      
    }
  }


//  const onChangePage(pageOfItems) {
//     // update state with new page of items
//     setPageOfItems(pageOfItems);
//     //  setState({ pageOfItems: pageOfItems });

// }

     

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
        // console.log("Sorting Called",  isAscending,  isDecending);
        // let newProducts=products;
            // if(!isAscending && !isDecending)
            // newProducts=products;
            // if(  categoryValue!==0){
            //   // var Category=  categories.filter(
            //     //   function (cat) {
            //       //     console.log(  categoryValue);
            //       //     if(cat.id ===  categoryValue)return cat.Issue 
            //       //   }
            //       // )
                  
            //       // let CategoryName=Category[0].Issue;
            //       let category_name=  categories.filter(category=>parseInt(category.id)===parseInt(  categoryValue));
            //       console.log("category ID:",  categoryValue,category_name);

            //   products= category_name.length>0?products.filter(issue=>
            //     issue.category===category_name[0].Issue):products;
            // }
         if(  isAscending ){
          //   setState({isDecending:false})
           return products.sort((a, b) => a.price - b.price)
          }
          else if(  isDecending ){
          //  setState({isAscending:false})
            return products.sort((a, b) => b.price - a.price)
        }
      return products;
}


      const Search=(products)=>{    
        return (products.length>0 && products.filter(issue=>
                issue.Issue.toLowerCase().indexOf(  q.toLowerCase())!==-1 || //str.includes(PATTERN)
                // issue.price.toLowerCase().indexOf(q.toLowerCase())!==-1 ||
                issue.Severity.toLowerCase().indexOf(  q.toLowerCase())!==-1 ||
                issue.Status.toLowerCase().indexOf(  q.toLowerCase())!==-1

                ));

        }
      //   const Range=(p)=>{
      //     console.log("min:",  minRange,"  max:",  maxRange," num:",p.length);

      //     return p.filter(issue=>parseInt(issue.price)>=  minRange && parseInt(issue.price)<=  maxRange)
      // }
var user=  user;




        return (
            <>
             <NotificationSystem ref={notificationSystem} />
<div>
{/* <div> style={{ backgroundImage: `url("${back}")`,backgroundRepeat:'no-repeat'}}> */}
      
    {/* <Prompt
                when={  isBlocked}
                // message={(location)=> `Are You Sure Want To Leave ${location.pathname}`}
                message={(location, action) => {
                  if (action === 'POP') {
                    console.log("Backing up...",  history)
                  } 
              
                  let check= location.pathname.startsWith("/app")
                    ? true
                    : `Are you sure you want to go to ${  history.location.pathname}?`
                    // if(check)  history.push(  history.location.pathname)
                    return check
                }}
/> */}
   
    
    <Container  style={{paddingTop:'2rem',width:'100%'}}>

          <div  className="content">

          {isAuthenticated?null:
          <Prompt message={(location, action) => {
            if (action === 'POP') {
              console.log("Backing up...")
            }

            return location.pathname.startsWith("/updateIssue")
              ? `You Have to Login to Edit Issue`
              : true 
          }}/>

          }

          {/* <Container> */}
            <Row>
              <Col md={8}>
              <TrendingIssues/>
              </Col>
              <Col md={4}>

              <Chart_card
              icon={faThumbtack}
                statsIcon="fa fa-clock-o"
                title="Issue Chart"
                category="Last Campaign Performance"
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
          {/* </Container> */}
        

          { issues.length===0?<><Spinner style={{ width: '3rem', height: '3rem', color:'green' }} type="grow" /></>
               :<>

                <Container  className="filter-box" >
                  
                  <Row style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  
                          <Col sm={4} style={{display:'flex',alignItems:'center', width:'70%',color:'#b1b1b1',paddingLeft:'.4rem',borderRadius:'20px',border:'1px solid #b1b1b1',margin:'5px'}}>
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


                          
                                
                             
                            
                      

                          {/* {isAuthenticated?
                          <Col style={{}} sm={2} className='add_issue'>
                                <NavLink 
                                to="/addIssue">
                                      <Button variant="primary" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faPlus}/></Button>
                                  </NavLink>
                          </Col>
                          
                          :null} */}
                          <Col style={{}} sm={2} className='filter-icon'>
                            
                                  <DropdownButton  title={<FontAwesomeIcon icon={faFilter} />} className='filter-button' style={{borderRadius:'50%',background:'transparent',color:'#3c44b1 ',border:'none',boxShadow:'none'}}> 
                                        
                                        {/* <Row > */}
                                        <div >
                 <Card className="filter-card" >

                
                    <Card.Body className="filter-body" style={{width:'15rem',padding:'0rem'}}>
                        {/* <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle style={{background:!  open1?"#fff":'#f3f3f3'}} eventKey="0" onClick={() => setOpen1(!open1)}>
                                    <div className="accordion-header" ><h6>Severity</h6><FontAwesomeIcon style={{color:  open1?"red":"#3b44c1"}} icon={  open1?faChevronCircleRight:faChevronCircleDown} /></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body >
                                  <div className="range-input" ><span style={{color:'#b1b1b1'}}><b>Min:</b></span><input  type='number' value={  minRange} onChange={(e)=> setState({minRange:e.target.value})}/>
                                  </div>
                                  <div className="range-input"><span style={{color:'#b1b1b1'}} ><b>Max:</b></span><input  type='number' value={  maxRange} onChange={(e)=> setState({maxRange:e.target.value})}/>
                                </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                           
                            </Accordion> */}
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


                            {/* <Accordion defaultActiveKey="10">

                            <Card>
                            <Accordion.Toggle  style={{background:!  open3?"#fff":'#f3f3f3'}} eventKey="10" onClick={()=> setOpen3(!open3)}>
                                    <div className="accordion-header"><h6>Category</h6><FontAwesomeIcon style={{color:  open3?"red":"#3b44c1"}} icon={  open3?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="10">
                                <Card.Body>

                                    <Form.Group as={Col}>
              
                                            <Form.Control className="category-box"
                                              as="select"
                                              // type="password"
                                              placeholder=""
                                              name="category"
                                              value={  categoryValue}
                                              onChange={(e)=> setState({categoryValue:e.target.value})}
                                              // isInvalid={!!errors.category}
                                              
                                            >
                                                <option value="0">Choose Category</option>
                                                { props.categories.map((category)=>(
                                                      <option value={category.id}>{category.name}</option>

                                                ))}
                                                
                                            </Form.Control>
                                          
                                          </Form.Group>                                   
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion> */}

                            {/* <Accordion defaultActiveKey="5">

                            <Card>
                            <Accordion.Toggle style={{background:  open4?"#fff":'#f3f3f3'}}  eventKey="3" onClick={()=> setState(prevState => ({open4: !prev open4}))}>
                                    <div className="accordion-header"><h6>Sort By Price</h6><FontAwesomeIcon style={{color:  open4?"#3b44c1":"red"}} icon={  open4?faChevronCircleDown:faChevronCircleRight}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                                        
                                        <div onClick={()=>{ setState(prev=>({isAscending:!prev.isAscending}))}} className="asending" style={{border:  isAscending?'1px solid green':'',background:  isAscending?' rgb(194, 255, 194)':'',marginBottom:'.6rem',display:'flex',alignItems:'center',cursor:'pointer'}}><a><FontAwesomeIcon style={{color:!  isDecending?'#3b44c1':'#b1b1b1'}} icon={faArrowAltCircleUp}/><h7>Ascending</h7></a></div>
                                        <div onClick={()=>{ setState(prev=>({isDecending:!prev.isDecending}))}} className="desending" style={{border:  isDecending?'1px solid red':'',background:  isDecending?' rgb(255, 213, 213)':'',display:'flex',alignItems:'center',cursor:'pointer'}}><FontAwesomeIcon style={{color:!  isAscending?'red':'#b1b1b1'}} icon={faArrowAltCircleDown}/><h7>Decending</h7></div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion> */}
   
                </Card.Body>   
                           
                         
                           </Card>
                           </div>
                                       {/* </Row>     */}
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
                                                                           
                        {/* <Card.Title><b>{issue.Issue}</b></Card.Title> */}
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        {/* <Row>
                                <span style={{color:'#3b44c1',fontSize:'.8rem'}}>{issue.manufacturer}</span>
                            </Row> */}
                            {/* <Row>
                                <h3 style={{margin:'0rem'}}>{issue.Issue}</h3 >
                            </Row> */}
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h7  style={{display:  isSeverity?'flex':'none',margin:'0rem 0rem',fontWeight:'bold',fontSize:'12px'}}>Severity: {issue.Severity}</h7><br/>
                                {/* <p style={{display:  isStatus?'':'none',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{issue.rating?issue.rating:"0"} <FontAwesomeIcon  icon={faStar}/></p>  */}
                             
                            </Row>
                            <Row style={{display:'flex',fontSize:'12px'}}>
                            </Row>
                             <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:  isStatus?'flex':'none'}}> <h7 style={{color:'#b1b1b1',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem'}}>Status:</b></h7><span style={{color:issue.Status.localeCompare("Open")===0?'#1bc943':'rgb(252 102 116) ',borderRadius:'5px',border:issue.Status.localeCompare("Open")===0?'1px solid #1bc943':' 1px solid #f83245',padding:'.0rem .3rem'}}><b>{issue.Status}</b></span>
                            </div></Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:  isAddedBy?'flex':'none'}}> <h7 style={{color:'#b1b1b1',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{marginRight:'.2rem'}}>Raised By:</b></h7><span><b>{issue.user?issue.user.fname:"Unknown"}</b></span>
                           </div> </Row>
                            <Row style={{display:'flex',alignItems:'center', fontSize:"12px"}}>
                                <h7 style={{display:isDate?'flex':'none',color:'#b1b1b1',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faCalendarAlt}/><b style={{marginRight:'.2rem'}}>Created Date:</b><span>{issue.date}</span></h7>
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
         <div style={{justifyContent:'space-around',display:'flex',alignItems:'center'}}>
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