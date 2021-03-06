import React,{Component, useEffect, useState} from 'react';
import {Col, Card, Button, Row,Form,Container} from 'react-bootstrap';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import {selectAuth, selectUser} from '../../user/userSlice';
import {  Prompt } from "react-router-dom";
import { addIssueAsync } from '../issueSlice';


const schemaPro = yup.object({
    Issue:yup.string().required("Issue Name is Required"),
    Severity:yup.string().required(),
    Status:yup.string().required("Status  is Required"),
    // Date:yup.string().required("Date  is Required"),
    Description:yup.string().required("Dscription  is Required"),

})


function IssueForm(props){
  // constructor
const dispatch=useDispatch();
const userinfo= useSelector(selectUser);
  const [msg,setMsg]=useState(null);
  const [isBlocking,setIsBlocking]=useState(false);
  const [Issue,setIssue]=useState(""); 
  const [Severity,setSeverity]=useState(""); 
  const [Status,setStatus]=useState(""); 
  const [Date,setDate]=useState('2021-05-28');
  const isAuthenticated=useSelector(selectAuth);

useEffect(()=>{
      
  if(!isAuthenticated){
      console.log("From Product to Home");
      props.history.push('/')
    
     }

},[props,isAuthenticated]);

 
    var isLoaded= isLoaded;
    return (
      <div className="content">
        <Container fluid>
          <Prompt
                when={ isBlocking}
                message={(location)=> `Are You Sure Want To Go To ${location.pathname}`}
/> 
          <Row>
            <Col md={6}>
<Card style={{display:'flex',justifyContent:'space-between'}}>


  <Card.Header>
    <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#3b44c1'}}>Create an Issue</p>
  </Card.Header>    


  <Card.Body>
  <Formik
  validationSchema={schemaPro}
 

  initialValues={{Issue:"",Severity:"Critical",Status:'',Description:''}}

  onSubmit={(values)=>{ 

    const {Issue,Severity,Status,Description}=values;
  
    
    const user= userinfo;
   

    const issue={
        Issue,Description,Severity,Status,user
    }
        dispatch(addIssueAsync(issue));
     setIsBlocking(false);
     console.log("IsBlocking",isBlocking);
      props.history.goBack();
   
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
      <Form.Group as={Col} md="12" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
      
          <Form.Label>Issue Name</Form.Label>
          
            <Form.Control
              type="text"
              placeholder="Issue Name"
              aria-describedby="inputGroupPrepend"
              name="Issue"
              value={values.Issue}
              onChange={(e)=>{ setIsBlocking(e.target.value.length>0);handleChange(e); setIssue(e.target.value)}} 
              isInvalid={!!errors.Issue}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Issue}
            </Form.Control.Feedback>
          
        </Form.Group>
        </Form.Row>



        <Form.Group as={Col} md="12" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
                <Form.Row>
                      <Form.Label>Description</Form.Label>
          
                <textarea 
                  type="text-area"
                  placeholder="Type Description"
                  aria-describedby="inputGroupPrepend"
                  name="Description"
                  value={values.Description}
                  onChange={(e)=>{ setIsBlocking(e.target.value.length>0);handleChange(e); setIssue(e.target.value)}} 
                  isInvalid={!!errors.Description}
                  />
                   {errors.Description && touched.Description && (
                        <div className="input-feedback">{errors.Description}</div>
                    )}
                  </Form.Row> 
        </Form.Group>
        <Form.Row>
      <Form.Group as={Col} md="12" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>

        <Form.Label>Severity</Form.Label>
                    {/* <input className={errors.quantity && touched.quantity && "error"} value={values.quantity} onChange={handleChange} onBlur={handleBlur} type="number" placeholder="Enter Product Quantity" name="quantity"/><br/> */}
                    <select name="Severity" id="Severity" value={values.Severity}   onChange={(e)=>{ setIsBlocking(e.target.value!=='Critical'); handleChange(e); setSeverity(e.target.value);}} >
                    <option value="Critical">Critical</option>
                    <option value="Minor">Minor</option>
                    <option value="Major">Major</option>
                    
                    </select>
                   
                    {errors.Severity && touched.Severity && (
                        <div className="input-feedback">{errors.Severity}</div>
                    )}
                    <br/>
                   
                    </Form.Group>
        </Form.Row>
        <Form.Row>
      <Form.Group  as={Col} md="12" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>

                    <div value={values.Status} onChange={(e)=>{ setIsBlocking(e.target.value!=='Critical'); handleChange(e); setStatus(e.target.value);}} role="group" aria-labelledby="my-radio-group" >
                    <Form.Label>Status</Form.Label>
                        <label className="group">
                        <Field type="radio" name="Status" value="Open" />
                        Open
                        </label>
                        <label className="group">
                        <Field type="radio" name="Status" value="In Progress" />
                        In Progress
                        </label>
                        <label className="group">
                        <Field type="radio" name="Status" value="Closed" />
                        Closed
                        </label>
                       

</div>
 
                    {errors.Status && touched.Status && (
                        <div className="input-feedback">{errors.Status}</div>
                    )}


</Form.Group>
        </Form.Row>
                      
        
      <Form.Group style={{width:'92%',paddingLeft:'2rem'}}>
      <Button style={{marginTop:'10px'}} type="submit">Submit</Button>
      </Form.Group>
    </Form>
  )}
</Formik>
</Card.Body>
</Card>

                        </Col>




           
          </Row>
        </Container>
      </div>
    );
  }



export default IssueForm;
