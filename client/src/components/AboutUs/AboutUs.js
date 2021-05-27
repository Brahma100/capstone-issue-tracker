import React, { Component } from 'react';
import './AboutUs.css'
import { NavLink, withRouter} from 'react-router-dom';

import { Container,Row,Col,Card } from 'react-bootstrap';
import banner from '../../assets/images/aboutus.png' 
import journey from '../../assets/images/journey.png' 




class AboutUs extends Component {  
    render(){
        return (
            <>
<div className="App"  >
           
           
            <Container>
          <div className="content" >
            <Container fluid>
              <Row>
              
                <Col md={5} style={{marginTop:'5rem'}} >
                    <Card className="intro_card">
                        <div className="text-black mt-3 card-content">
                            <h1 className=" mb-3 font-weight-bold">About Us</h1>
                            <h6 style={{textAlign:'none'}} className="font-size-lg "><b>TrackerZ</b> is one of the leading Issue Tracking Software Web Solution companies known for its state-of-the-art Issue/Ticket Tracking solutions which includes features like Main Dashboard page, Issue Logs for the Issue History and Admin Panel where admin can Mutate/Modify the Issues, This Project is designed in India and can Provide Issue Tracking solutions to the Enterprise businesses.</h6>
                            <div className="divider border-2 border-dark my-4 border-light opacity-2 rounded-circle w-25"></div>
                                <div>
                                    <NavLink style={{color:'white',background:'rgb(252, 138, 62)'}} to='/aboutUs' className="d-block d-sm-inline-block btn btn-primary btn-lg" >
                                    <span className="btn-wrapper--icon">
                                    </span><span className="btn-wrapper--label" >Read More</span></NavLink>
                                    
                                </div>
                            </div>
                    </Card>
                </Col>
                
                <Col md={7}>
                  <Card style={{marginTop:'5rem'}} className='banner-card'>
                      <div className='banner'>
                          <img  alt="alt" src={banner}/>
                      </div>
                  </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
  
      </Container>
            <Container style={{marginTop:'5rem',marginBottom:'5rem'}}>
          <div className="content" >
            <Container fluid>
              <Row>
              
              
                
                <Col md={6}>
                  <Card style={{marginTop:'5rem'}} className='banner-card'>
                      <div className='banner'>
                          <img  alt="alt" src={journey}/>
                      </div>
                  </Card>
                </Col>
                <Col md={5} >
                    <Card style={{marginTop:'5rem'}} className="intro_card">
                        <div className="text-black mt-3 card-content">
                            <h1 className=" mb-3 font-weight-bold">Our Journey</h1>
                            <h6 style={{textAlign:'left'}} >We began our journey as a startup in 2021, and it has taken us a lot more than resources and hard work to put ourselves on the map. During this period we learnt a lot about development and marketting.</h6>
                            <div className="divider border-2 border-dark my-4 border-light opacity-2 rounded-circle w-25"></div>
                                <div>
                                    
                                    
                                </div>
                            </div>
                    </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
  
      </Container>
      
      
      </div>

    <div>
    
 

<div className="about">
<h1 style={{fontWeight:'bold',color:'white'}}>Our Location</h1>
</div>

<div className="ourteam">
<p>7/A, Brahma Jaiswal Road, Navy Apartment (Second Floor)
Sector-8, Chennai - 600101</p>

</div>
<div className="location">

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.1146356065!2d79.92880799953032!3d13.04804380118091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1582835093586!5m2!1sen!2sin" width="100%" height="500px" frameBorder="0"  allowFullScreen></iframe>

<div className="location_tag">
    <div>Location</div>
</div>
</div>

     
 </div>  
            </>
          );
    }
  
};

export default AboutUs;
