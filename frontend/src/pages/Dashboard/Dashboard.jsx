import React from "react";
import Layout from "../../components/Layout";
import Usersidebar from "../../components/Usersidebar";
import { useAuth } from "../../context/Authcontext";

function Dashboard() {
  const {auth}=useAuth();
  return (
    <Layout>
      <div className="container-fluid p-0">

        <div className="row">
          <div className="col-md-3 col-sm-12">
                  <Usersidebar/>
          </div>
          
          <div className="col-md-9 col-sm-12">
            <h4>Welcome Author :{auth.user.username}</h4>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;
