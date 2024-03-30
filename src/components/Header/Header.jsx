import React, {useRef, useEffect, useContext} from "react";
import {Container,Row,Button} from 'reactstrap';
import {NavLink,Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

const nav_links=[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
    {
        path:'/tours',
        display:'Tours'
    },
    {
        path:'/custompackage',
        display:'Custom package'
    },
];
const Header = () => {
    // const {id} = useParams();
    // const {
    //     data: userDetail,
    //     loading,
    //     error
    //     } = useFetch(`${BASE_URL}/users/${id}`);

    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    const logout = () => {
        dispatch({type:"LOGOUT"});
        navigate('/');
    };

    const stickyHeaderFunc = () =>{
        window.addEventListener('scroll', ()=>{
            if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
                headerRef.current.classList.add('sticky_header');
            }else{
                headerRef.current.classList.remove('sticky_header');
            }
        });
    };

    useEffect(()=>{
        stickyHeaderFunc();
        return window.removeEventListener('scroll', stickyHeaderFunc);
    });

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');
    console.log(user);

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="naw_wrapper d-flex align-items-center 
                    justify-contenet-between">
                        {/* =======logo======== */}
                        <div className="logo">
                            <img src={logo} alt=""/>
                        </div>
                        {/* =======logo end======= */}

                        {/* ===== menu start ====== */}
                            <div className="navigation " ref={menuRef} onClick={toggleMenu}>
                                <ul className="menu d-flex align-items-center gap-5">
                                    {
                                        nav_links.map((item,index)=>(
                                            <li className="nav_item" key={index}>
                                                <NavLink to={item.path} className={navClass=>
                                                navClass.isActive ? 'active_link':""
                                                }>
                                                    {item.display}
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        {/* ===== menu end ====== */}
                        <div className="nav_right d-flex align-items-center gap-4">
                            <div className="nav_btns d-flex align-items-center mt-0 gap-4">
                            {
                                    user? (<>
                                        <Link to={'/admin'}>
                                        <h5 className="mb-2" style={{outline:'none'}}>
                                            <i className="ri-user-line"></i>
                                            {user.username}
                                        </h5>
                                        </Link>
                                        <Button className="btn btn_dark" onClick={logout}>
                                            Logout
                                        </Button>
                                    </>) : (<>
                                        <Button className="btn primary__btn gap-4 mt-0">
                                        <Link to='/login'>Login</Link>
                                        </Button>
                                        <Button className="btn primary__btn">
                                            <Link to='/register'>Register</Link>
                                        </Button>
                                    </>)
                            }

                                <Button className="package btn primary__btn">
                                    <Link to='/package'>Package</Link>
                                </Button>
                                <span className="mobile_menu" onClick={toggleMenu}>
                                    <i class="ri-menu-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </Row>
            </Container>
        </header>
    )
};
    
export default Header;