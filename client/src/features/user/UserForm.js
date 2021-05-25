import React, { useEffect, useState } from 'react';
import NotificationSystem from 'react-notification-system';
// import './UserForm.css'
import { Prompt, withRouter} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { addUserAsync, loadUserAsync,loginUserAsync,selectAuth,selectUser } from './userSlice';
import back from '../../assets/images/back.jpg'

import banner from '../../assets/images/LoginSVG.png' 


import { Button,InputGroup,Col,Alert,NavLink, Modal,Form,Container,Row,Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import * as yup from 'yup';

import Loading from '../../components/LazyLoadingPage/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfo } from '@fortawesome/free-solid-svg-icons';




const schemaLogin = yup.object({
    email: yup.string().email('Invalid email').required(),
    password: yup.string().min(0, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required()
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const schemaRegister = yup.object({
    fname:yup.string().min(1, 'At least 1 characters').max(10, 'First Name can be maximum 10 characters').required(),   
    lname:yup.string().min(1, 'At least 1 characters').max(10, 'Last Name can be maximum 10 characters').required(),   
    city:yup.string().min(3, 'City must be at least 3 characters').max(24, 'City can be maximum 20 characters'),   
    state:yup.string().min(3, 'State must be at least 3 characters').max(24, 'State can be maximum 20 characters'),   
    country:yup.string().min(3, 'Country must be at least 3 characters').max(24, 'Country can be maximum 20 characters'),   
    postal:yup.number().integer(),   
    email: yup.string().email('Invalid email').required(),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required(),
    // mobile_number:yup.number().max(9999999999,'Invalid Number').required()//.matches(phoneRegExp,"Number is Not Like Mobile number"),   
})


function UserForm(props){  

  const dispatch=useDispatch();
  const user=useSelector(selectUser);
  const isAuthenticated=useSelector(selectAuth);
    const notificationSystem = React.createRef();
    
    const [signIn,setSignIn]=useState(false);
    const [city,setCity]=useState("");
    const [state,setState_name]=useState("");
    const [country,setCountry]=useState("");
    const [postal,setPostal]=useState("");
    const [ip,setIp]=useState("");
    const [startRender,setStartRender]=useState(true);
    const [isBlocking,setIsBlocking]=useState(true);
    const [remember,setRemember]=useState(true);

 

    const addNotification = msg => {
      const notification = notificationSystem.current;
      notification.addNotification({
        title:<div><FontAwesomeIcon icon={faExclamationTriangle}/> Server Error</div>,
        message:  msg,
        level: 'error',
        position:'tc',
        autoDismiss:5
      });
    };

useEffect(
  async function(){
    // console.log("Async loadinng")

    // if(props.history.location.state!=='button'){
    // let authenticate = window.confirm("You Need To Login To Get Full Access of ShopperZ")
    // if(!authenticate){
    //           props.history.push('/')
    // }}


    let response=await fetch(`https://geolocation-db.com/json/`)
    let ipData=await response.json();
    setCity(ipData.city);
    setPostal(ipData.postal);
    setCountry(ipData.country_name);
    setIp(ipData.IPv4);
    setState_name(ipData.state);
 
  },[])



useEffect(
  
  function(){
      dispatch(loadUserAsync());
         console.log("Action Login Page:",  props.history);
         if( props.history.action==='POP')
         {
             setTimeout(()=>{
             console.log("timeout",isAuthenticated);
             if(isAuthenticated){
                 props.history.push('/')
               //   props.loginModalOpen(true);
             }
           },50)
         }
         else
          if(isAuthenticated){
           console.log("Direct",isAuthenticated);
             props.history.push('/')
           //   props.loginModalOpen(true);
          }
          setTimeout(()=>{
            setTimeout(true);
              //  setState({startRender:true})
          },60)
     }
,[]);

useEffect(
  
  function(prevProps){
    dispatch(loadUserAsync());
        // if(error!==prevProps.error){
        //     if(error.id==="REGISTER_FAIL"){
        //           setState({msg:error.msg.msg});
        //           setState({isBlocking:true});
        //           addNotification( msg);
        //       }
        //       else if(error.id==="LOGIN_FAIL"){
        //           setState({msg:error.msg.msg});
        //           setState({isBlocking:true});
        //         setTimeout(()=>{
                  
        //             addNotification( msg? msg:"Something Went Wrong");
        //         },60);
        //         // console.log("Error R:",error.msg.msg, msg);
        //     }
        //     else{
        //           setState({msg:null});
                
        //     }
        // }
        

        dispatch(loadUserAsync());
       if(isAuthenticated){
         console.log("update Component");
          props.history.push('/')
        //   props.loginModalOpen(true);
       }
      }
,[dispatch,isAuthenticated,user])

    const handleSignIn=()=>{
        console.log("Sign In Toggle Called", signIn);
          setSignIn(!signIn);
    }
   
  
        return (
           
           <>

           <NotificationSystem ref={  notificationSystem} />
           {!startRender?<Loading/>:
          <div>
<div className="App" style={{alignItems:'center', backgroundImage: `url("${back}")`,backgroundRepeat:'no-repeat'}} >
      
           
            <Container>
          <div className="content" >
            <Container fluid>
            {/* <Prompt
                when={ isBlocking}
                message={(location)=> `Are You Sure Want To Go To ${location.pathname}`}
/>  */}
              <Row>
             
                <Col md={6} >
                    <Card style={{marginTop:'5rem'}} >
                    { signIn?
                    <> 
                        <Card.Header >

                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <h7 style={{fontSize:'22px'}}><b>Create a New Account</b></h7>    
                                <span style={{fontSize:'14px',color:'rgba(59,62,102,.5)'}}>Start benefiting from our tools right away</span>
                            </div> 
                            {/* { msg?<Alert color="danger">{ msg}</Alert>:null}    */}
                        </Card.Header>  
<Card.Body>
                        <Formik
    // validator={() => ({})}
      validationSchema={schemaRegister}
      initialValues={{
        fname:'',
        lname:'',
        email:'',
        password:'',
        city: city,
        state: state,
        postal: postal,
        country: country,
        ip:ip
        // mobile_number:''

      }}
      onSubmit={(values)=>{ 

        const {fname,lname,email,password}=values;
        // let ip= ip;
        const newUser={
          fname,lname,email,password,city,state,postal,country,ip
        }
        console.log("OnSubmit Data.......",newUser)
        setIsBlocking(false);
          // setState({isBlocking:false});
                // console.log("Update:", isBlocking);
         dispatch(addUserAsync(newUser));
          setTimeout(()=>{
                              dispatch(loadUserAsync());
                          },500)
        
    }
    }
    >
       
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
         }) => (
        <Form noValidate onSubmit={handleSubmit}>
          
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik01">
           
              <Form.Label>First Name</Form.Label>
              
              <Form.Control
                type="text"
                placeholder="First Name"
                name="fname"
                value={values.fname}
                // onChangeCapture={(e)=>  setState({isBlocking:e.target.value>0})}
                // setState({isBlocking:e.target.value.length>0});
                onChange={e=>{ setIsBlocking({isBlocking:e.target.value.length>0});   handleChange(e)}}
                isInvalid={!!errors.fname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lname"
                value={values.lname}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.lname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lname}
              </Form.Control.Feedback>
            </Form.Group>
           

          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Label>Email ID</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Email ID"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>
         
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city?values.city: city}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>State</Form.Label>
              <Form.Control
               disabled
                type="text"
                placeholder="State"
                name="state"
                value={values.state?values.state: state}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Postal</Form.Label>
              <Form.Control
             
                type="number"
                placeholder="Postal"
                name="postal"
                value={values.postal?values.postal: postal}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.postal}
              />
              <Form.Control.Feedback type="invalid">
                {errors.postal}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Country</Form.Label>
              <Form.Control
               disabled
                type="text"
                placeholder="Country"
                name="country"
                value={values.country?values.country: country}
                onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Phone/Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                name="mobile"
                value={values.mobile_number}
                onChange={handleChange}
                isInvalid={!!errors.mobile_number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile_number}
              </Form.Control.Feedback>
            </Form.Group> */}

          </Form.Row>
            

          {/* <Form.Row>
          <Map
                google={  props.google}
                center={{lat: 18.5204, lng: 73.8567}}
                height='300px'
                zoom={15}
    />
          </Form.Row>
          <Form.Row>
         
          </Form.Row>
          <Form.Row>
         
          </Form.Row>
          <Form.Row style={{marginBottom:'10rem'}}>
         <p>Hello</p>
          </Form.Row> */}
          <Button type="submit">Register</Button>
          
          <input defaultChecked={ remember} style={{marginLeft:'1rem',marginTop:'.5rem'}} type="checkbox" /><span>  Remember me!</span>
                            <div style={{}} className="forgot-password text-right">
                                Already registered <span onClick={handleSignIn} ><a ><b>Sign in?</b></a></span>
                            </div>
                            <div id="imgTest"></div>
                        </Form>
                        
                    )}
                    </Formik>
                    </Card.Body></>:
                <>
                    <Card.Header>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <h7 style={{fontSize:'22px'}}><b>Login Now</b></h7>    
                                <span style={{fontSize:'14px',color:'rgba(59,62,102,.5)'}}>Login To Continue The Contribution with Our Advanced Tools!!</span>
                            </div>   
                    </Card.Header>
                    <Card.Body>
                    <Formik
                        validationSchema={schemaLogin}
                        initialValues={{
                            email:'',
                            password:'',

                        }}
                        onSubmit={(values)=>{ 
                          setIsBlocking(false);
                            // setState({isBlocking:false});
                          console.log("Update:", isBlocking);
                        const {email,password}=values;
                    
                        const user={
                            email,password
                        }
                          dispatch(loginUserAsync(user));
                          // setTimeout(()=>{
                          //     dispatch(loadUserAsync());
                          // },3000)
                        }
                        }
                        >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched
                            }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                            
                            
                            <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationFormik02">
                                <Form.Label>Email ID</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                    type="text"
                                    placeholder="Email ID"
                                    aria-describedby="inputGroupPrepend"
                                    name="email"
                                    value={values.email}
                                    onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                                    isInvalid={!!errors.email}
                                    />
                                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                    {touched.email && errors.email}
                                    </Form.Control.Feedback>
                                   
                                </InputGroup>
                                </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                
                                <Form.Group as={Col} md="12" controlId="validationFormik03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={e=>{  setIsBlocking({isBlocking:e.target.value.length>0}); handleChange(e)}}
                                    isInvalid={!!errors.password}
                                />
                                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {touched.password && errors.password}
                                </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>
                            {/* <Form.Group>
                                <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={e=>{  setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                id="validationFormik0"
                                />
                            </Form.Group> */}
                            <Button type="submit">Login</Button>
                            <input defaultChecked={ remember} style={{marginLeft:'1rem',marginTop:'.5rem'}} type="checkbox" /><span>  Remember me!</span>
                                                    <div style={{marginTop:'1rem',}} className="forgot-password text-right">
                                                    Don't have an account?  <span onClick={handleSignIn} ><a><b>Create an Account</b></a></span>
                                    </div> 
                            </Form>
                        )}
                        </Formik>
                    </Card.Body>
                    </>}




                    </Card>
                </Col>
                
                <Col md={6}>
                  <Card style={{marginTop:'5rem'}} className='banner-card '>
                      <div className='banner'>
                          <img  alt="alt" src={banner}/>
                      </div>
                  </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
  
      </Container>
            
      
      
      </div>
 
     </div>}
            </>
          );
    }
  



export default withRouter(UserForm);
