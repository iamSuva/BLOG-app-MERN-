import React from "react";
import { Link } from "react-router-dom";
function Usersidebar() {
  return (
    <div>
      <div className="d-flex flex-column sidebar">
        <h4>User Dashboard</h4>
        
        <Link to="/dashboard/add-blog" className="sidebar-link">Add </Link>
        <Link to="/dashboard/my-blogs" className="sidebar-link">My blogs</Link>
        
      </div>
    </div>
  );
}

export default Usersidebar;
