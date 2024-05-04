import React from 'react'
import Usersidebar from '../../components/Usersidebar'
import Layout from '../../components/Layout'
import Addblogform from '../../components/Addblogform'
function Addblog() {
  return (
    <Layout>
    <div className="container-fluid p-0">

      <div className="row">
        <div className="col-md-3 col-sm-12">
                <Usersidebar/>
        </div>
        
        <div className="col-md-9 col-sm-12">
           <h1>Add blog</h1>
           <Addblogform/>
        </div>
      </div>

    </div>
  </Layout>
  )
}

export default Addblog