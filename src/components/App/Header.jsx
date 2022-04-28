import {
    Link,
    NavLink,
} from "react-router-dom";
import { Input } from 'antd';
import Account from "../Account/Account";


const { Search } = Input;
const onSearch = value => console.log(value)

export function Header () {

    const toggleMenu = e => {
        e.preventDefault();
        document.getElementById('isToggle').classList.toggle('open');
        var isOpen = document.getElementById('navigation')
        if (isOpen.style.display === "block") {
            isOpen.style.display = "none";
        } else {
            isOpen.style.display = "block";
        }
      };
    
      const prevDefault = e => {
        e.preventDefault();
      }

    return (
        
        <>
            <Link className="logo" to="/">
                <span className="logo-light-mode">
                    <img src="/images/logo-dark.png" height="26" className="l-dark" alt="" />
                    <img src="/images/logo-white.png" height="26" className="l-light" alt="" />
                </span>
                <img src="/images/logo-light.png" height="26" className="logo-dark-mode" alt="" />
            </Link>

            <div className="menu-extras">
                <div className="menu-item">

                    <NavLink className="navbar-toggle" id="isToggle" onClick={e => toggleMenu(e)} to="">
                    <div className="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    </NavLink>

                </div>
            </div>

            <div id="navigation">
                <ul className="navigation-menu nav-right nav-light">
                    <Search
                        id="search"
                        className="input search text"
                        style={{
                            display : "inline-block",  
                            width: "350px",
                            margin: "20px",
                                }}
                        placeholder="Search collections and accounts"
                        allowClear
                        enterButton="GO"
                        size="large"
                        // loading="true"
                        onSearch={onSearch}
                    />
                    <li className="has-submenu parent-parent-menu-item">
                        <Link to="##" onClick={e => prevDefault(e)}>Explore</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li><Link to="/assets" className="sub-menu-item">All NFTs</Link></li>
                            <li><Link to="/category/art" className="sub-menu-item">Art</Link></li>
                            <li><Link to="/category/collectibles" className="sub-menu-item">collectibles</Link></li>
                            <li><Link to="/category/photography" className="sub-menu-item">photography</Link></li>
                            <li><Link to="/category/sports" className="sub-menu-item">sports</Link></li>
                            <li><Link to="/category/music" className="sub-menu-item">Music</Link></li>
                            <li><Link to="/category/utility" className="sub-menu-item">Utility</Link></li>
                        </ul>
                    </li>

                    <li><Link to="/" className="sub-menu-item">Profile</Link></li>
                    
                    <li><Link to="/transactions" className="sub-menu-item"> Activity</Link></li>

                    <li className="has-submenu parent-parent-menu-item">
                        <Link to="##" onClick={e => prevDefault(e)}>More</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                            <li><Link to="/terms" className="sub-menu-item">Terms Policy</Link></li>
                            <li><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                        </ul>
                    </li> 

                    <Account />
                    
                </ul>
            </div>
        </>
    )
}
