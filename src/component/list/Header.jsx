import React from "react";
import {Link} from 'react-router-dom'

function Header() {
  return <div className="flex items-stretch justify-end">
    <Link to='/' className="ml-5 mr-5">자유게시판</Link>
    <Link to='/market' className="ml-5 mr-5">장터</Link>
  </div>
}

export default Header;
