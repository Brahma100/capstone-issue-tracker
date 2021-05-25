<Col md={4}>
<Card className="product-card" style={{ width:'19rem'}}>
       <Card.Header>
         <div>
           <h7 style={{fontSize:'20px',color:'gray'}}><b>Demo Of New Product</b></h7>
         </div>
       </Card.Header>
       <Card.Img top style={{height:'8rem',marginLeft:'3.5rem',marginTop:'1rem',width:'12rem'}} src={ imageURL? imageURL:default_product} alt="Card image cap" />
          <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                               
            <Card.Title><b>{ name}</b></Card.Title>
            <Card.Subtitle style={{marginLeft:'0rem'}}>
            {/* <Row>
                    <span style={{color:'#3b44c1',fontSize:'.8rem'}}>{ manufacturer}</span>
                </Row> */}
                {/* <Row>
                    <h3 style={{margin:'0rem'}}>{ name}</h3 >
                </Row> */}
                <Row style={{display:'flex',alignItems:'center'}}>
                 
                    <h4  style={{display: price?'flex':'none',margin:'0rem 0rem',fontWeight:'bold',fontSize:'16px'}}>₹{ price}</h4>
                    <p style={{display: rating?'':'none',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{ rating? rating:"0"} <FontAwesomeIcon  icon={faStar}/></p> 
                 
                </Row>
                {/* <Row style={{display:'flex',fontSize:'12px'}}>
                </Row> */}
                <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                   <div style={{display: stock?'flex':'none'}}> <h7 style={{color:'gray',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem'}}>Available Stock:</b></h7><span style={{color: stock>=10?'#1bc943':'#f83245',borderRadius:'5px',border: stock>=10?'1px solid #1bc943':' 1px solid #f83245',background: stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem'}}><b>{ stock}</b></span>
                </div></Row>
                <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                   <div style={{display: isManufacturer?'flex':'none'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{marginRight:'.2rem'}}>Added By:</b></h7><span><b>{ user? user.name:null}</b></span>
               </div> </Row>
                <Row style={{textOverflow:'none',fontSize:"12px",paddingBottom:'.2rem'}}>
                   <div style={{display: manufacturer?'flex':'none'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faIndustry}/><b style={{marginRight:'.2rem'}}>Manufacturer:</b></h7><span><b>{ manufacturer? manufacturer:null}</b></span>
               </div> </Row>
               
            </Card.Subtitle>
           
          </Card.Body>
         
          {/* <div className="bottom-button" >
            <UpdateProductModal isAuthenticated={ isAuthenticated} product={product}/>
          { isAuthenticated?<Button variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{ deleteItem( id)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
            :
            <div>
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
                    
            <Button disabled variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{ deleteItem( id)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                
            </OverlayTrigger>
        </div>
                    
              }
            </div> */}
        </Card>

</Col>