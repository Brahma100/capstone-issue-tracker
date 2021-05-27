import React,{useEffect, useState} from 'react';
import {Col, Card, Button, Row,Form,Container, InputGroup,Spinner, Tooltip} from 'react-bootstrap';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import {selectAuth, selectUser} from '../../user/userSlice';
import { editIssueAsync } from '../issueSlice';
import { Prompt } from 'react-router';


const schemaPro = yup.object({
    Issue:yup.string().required("Issue Name is Required"),
    Severity:yup.string().required(),
    Status:yup.string().required("Status  is Required"),
    Description:yup.string().required("Description  is Required"),
    Comments:yup.string().required("Comments  is Required"),

})


function EditIssue(props){
  const issue=props.history.location.state.issue;
const dispatch=useDispatch();
const userinfo= useSelector(selectUser);
  const [msg,setMsg]=useState(null);
  const [isBlocking,setIsBlocking]=useState(false);
  const [Id,setId]=useState(issue.id); 
  const [Issue,setIssue]=useState(issue.Issue); 
  const [Description,setDescription]=useState(issue.Description); 
  const [Severity,setSeverity]=useState(issue.Severity); 
  const [Status,setStatus]=useState(issue.Status); 
  const [Comments,setComments]=useState(''); 
  const isAuthenticated=useSelector(selectAuth);





useEffect(()=>{
      
  if(!isAuthenticated){
      // console.log("From Product to Home");
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
    <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#3b44c1'}}>Edit the Choosen Issue</p>
  </Card.Header>    


  <Card.Body>
  <Formik
  validationSchema={schemaPro}
 

  initialValues={{Issue:Issue,Description:Description,Severity:Severity,Status:Status,Comments:Comments}}

  onSubmit={(values)=>{ 

    const {Issue,Description,Severity,Status,Comments}=values;
    // console.log("On Submit Called",Issue);
    
    const user= userinfo;
    // console.log("User......",user);
    const id=Id;
    const issue={
        id,Issue,Description,Severity,Status,user,Comments
    }
    console.log("Edit Data",issue);
    // console.log("Submitted Issue:.......",issue)
  //  console.log("Name:",name," Des:",description," Manu:",manufacturer," price:",price," Stock:",stock," Img:",img,"  Cat",CategoryName," User:",user);
     dispatch(editIssueAsync(issue));
     setIsBlocking(false);
    //  console.log("IsBlocking",isBlocking);
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
                  onChange={(e)=>{ setIsBlocking(e.target.value.length>0);handleChange(e); setDescription(e.target.value)}} 
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
                    <select name="Severity" id="Severity" value={values.Severity}  onChange={handleChange}>
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

                    <div value={values.Status} onChange={handleChange} role="group" aria-labelledby="my-radio-group" >
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
        <Form.Group as={Col} md="12" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
                <Form.Row>
                      <Form.Label>Comments</Form.Label>
          
                <textarea 
                  type="text-area"
                  placeholder="Type Comments"
                  aria-describedby="inputGroupPrepend"
                  name="Comments"
                  value={values.Comments}
                  onChange={(e)=>{ setIsBlocking(e.target.value.length>0);handleChange(e); setComments(e.target.value)}} 
                  isInvalid={!!errors.Comments}
                  />
                   {errors.Comments && touched.Comments && (
                        <div className="input-feedback">{errors.Comments}</div>
                    )}
                  </Form.Row> 
        </Form.Group>

        
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



export default EditIssue;
