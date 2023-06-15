import React, { useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {message} from "antd"

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user)
    }
  }, [])
  const logoutHandler =()=>{
    localStorage.removeItem("user");
    message.error("Logout successfully");
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg px-5 ps-5">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse text-white fw-medium" id="navbarTogglerDemo01">
            <Link className="navbar-brand text-white nav_link" to="/" ><p className='fw-bold mb-0 fs-2'>Expanse Management</p></Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item user-select-none d-flex align-items-center">
              <div className="nav-link  text-capitalize text-white fst-normal">{loginUser && loginUser.userData.name}</div>
              </li>
              <li className="nav-item user-select-none fs-5">
              <button  className="nav-link btn btn-secondary text-white fst-normal" onClick={logoutHandler}> Logout</button >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>


  )
}

export default Header
