import React, { useState } from "react";
import logout from "../assets/logout.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    setIsLogin(false);
    alert("Logout Successfully!");
  };
  return (
    <>
      <aside className="sidebar">
        <span className="span">
          <div className="icon">
            <h3>TA</h3>
          </div>
          <div className="todo">
            <h2>Todo List</h2>
          </div>
        </span>

        <div className="list">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li> Important</li>
            <li> Progress</li>
          </ul>

          <div className="setting">
            <ul>
              <li>
                {isLogin ? (
                  <span onClick={handleAuth}>
                    <img src={logout} alt="logout" />
                    Logout
                  </span>
                ) : (
                  <Link to="/login">
                    <img src={logout} alt="login" />
                    Login
                  </Link>
                )}
              </li>
              {/* <li className='setting2'>⚙️ Settings</li> */}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
