import React,{useState, useContext} from "react";
import {Container , Row , Col , Form , FormGroup , Button} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login.css';
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "../context/AuthContext";
import {BASE_URL} from "./../utils/config";


const Login = () => {

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined,
    });

    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChage = e => {
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({type:"LOGIN_START"});

        try {
            
            const res = await fetch(`${BASE_URL}/auth/login`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });

            const result = await res.json();
            console.log(result)
            // if(!res.ok) alert(result.message);
            // console.log("user data",result.role);

            dispatch({type: "LOGIN_SUCCESS", payload:result.data});
            if(result.role==="admin"){
                navigate('/admin');
            }else if(result.role==="user"){
                navigate('/');
            }

        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.message});
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className="m-auto">
                        <div className="login_container d-flex align-items-between">
                            <div className="login_img">
                                <img src={loginImg} alt="" />
                            </div>
                            <div className="login_form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="email" placeholder="Email"
                                        required id="email" onChange={handleChage} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder="Password"
                                        required id="password" onChange={handleChage} />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth_btn" 
                                    type="submit">
                                        Login
                                    </Button>
                                </Form>
                                <p>
                                    Don't have an account?
                                    <Link to='/register'>Create</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
    
export default Login;