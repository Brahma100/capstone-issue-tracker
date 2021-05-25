import React, { Component,Fragment } from 'react'

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import  {logout}  from './userSlice';

function Logout(){
    // static propTypes={
    //     logout:PropTypes.func.isRequired
    // };
  const dispatch=useDispatch();
        return (
            <Fragment>
                <div className="dropdown-list-item-logout" onClick={()=>{dispatch(logout())}}>
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faSignOutAlt}/><h7>Logout</h7>    
                            </div> 
                {/* <NavLink style={{color:'red'}} onClick={this.props.logout} href="#">Logout</NavLink>  */}
            </Fragment>
        )
    
}

export default Logout;