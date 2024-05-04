import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Usersidebar from '../../components/Usersidebar'
import { useAuth } from '../../context/Authcontext'
import axios from 'axios';
import Blogtable from './Blogtable';

function Myblogs() {
  const [blogs,setblogs]=useState([]);
 const {auth}=useAuth();
 const token=auth.token;
 

  return (
    <Layout>
    <div className="container-fluid p-0">

      <div className="row">
        <div className="col-md-3 col-sm-12">
                <Usersidebar/>
        </div>
        
        <div className="col-md-9 col-sm-12">
          <h4>All blogs are</h4>
          <Blogtable />
        </div>
      </div>

    </div>
  </Layout>
  )
}

export default Myblogs