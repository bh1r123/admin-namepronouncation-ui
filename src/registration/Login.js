import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import './Login.css'
import Header from './../common/Header';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router'
import { post } from './../Network/Network'
import { LOGIN_URL } from './../common/Common'
function Login() {

    const navigate = useNavigate();

    const [showLoader,setShowLoader] = useState(false);

    const [login, setLogin] = useState({
        "empId": '',
        'password': ''
    })

    const handleLoginClicked = (event) => {
        if (login.empId == '') {
            showMessage("username can't be empty");
            return;
        }

        if (login.password == '') {
            showMessage("password can't be empty");
            return;
        }
        setShowLoader(true);
        post(LOGIN_URL, login, (data) => { 
            sessionStorage.setItem("token",data.data.token);
            navigate("/dashboard",{replace:true})
            setShowLoader(false);
        }, (error) => { 
            setShowLoader(false);
        });
    }

    const showMessage = (message) => {
        alert(message);
    }

    const StyledLink = styled(Link)(({ theme }) => ({
        margin: "4px"
    }));

    const onHandleChange = (event) => {
        login[event.target.id] = event.target.value;
        setLogin(login);
    }

    return (
        <Header open={showLoader}>
            <Container maxWidth="sm" className="centerwindow">
                <Card >
                    <div className="loginwindow">
                        <center><h3>Login</h3></center>
                        <TextField id="empId" label="Employee ID" variant="standard" margin="normal" defaultValue={login.empId} onChange={onHandleChange} />
                        <TextField id="password" label="Password" variant="standard" type="password" margin="normal" defaultValue={login.password} onChange={onHandleChange} />
                        <div className="rightcontent">
                            <Button variant="outlined" size="medium" onClick={handleLoginClicked}>Login</Button>
                        </div>
                    </div>
                </Card>
            </Container>
        </Header>
    )
}

export default Login
