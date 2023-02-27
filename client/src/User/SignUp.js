import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import { Alert, Sheet, Typography, FormControl, FormLabel, Input, Button, Link } from '@mui/joy';
import WarningIcon from '@mui/icons-material/Warning';
import RecordMini from '../Assets/vinyl.png'

import { createUser } from '../Utils/store'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                The Record Collector
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            await dispatch(createUser(credentials)).unwrap();
            history.push("/welcome");
            setErrorMessage('');
            setUsername('');
            setPassword('');
        } catch (error) {
            setErrorMessage('Does not meet requirements');
            console.log("Error:", error);
        }
    };

    console.log(props.isLoggedIn)

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <CssVarsProvider>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: -2, backgroundColor: '#c3d6c8' }}>
                    </div>
                </div>
                <main style={{ backgroundColor: 'transparent', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        position: 'absolute', top: '40%', left: '47%', transform: 'translate(-50%, -50%)', width: '300px'
                    }}>
                        <Sheet
                            sx={{
                                width: 400,
                                mx: 'auto', // margin left & right
                                my: 4, // margin top & botom
                                py: 1, // padding top & bottom
                                px: 2, // padding left & right
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                borderRadius: 'sm',
                                boxShadow: 'md',
                                background: '#F9FDFA',
                                textAlign: 'center'
                            }}
                            variant="outlined"
                        >
                            <div>
                                <Typography level="h4" component="h1">
                                    <b>Create your account... </b>
                                </Typography>
                                <Typography level="body2">...and start collecting!</Typography>
                            </div>
                            <FormControl>
                                <FormLabel>User Name</FormLabel>
                                <Input
                                    name="username"
                                    type="username"
                                    placeholder="User Name"
                                    required
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={password_confirmation}
                                    onChange={handlePasswordConfirmationChange}
                                />
                            </FormControl>

                            <Button sx={{ mt: 1, backgroundColor: '#c3d6c8', color: 'black' }} onClick={handleSubmit}> Log in </Button>
                            <Typography
                                endDecorator={<Link href="/login" sx={{ color: "#606761" }}>Log In</Link>}
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                Already have an account?
                            </Typography>
                            {errorMessage && errorMessage &&
                                <Alert
                                    startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
                                    variant="outlined"
                                    color="warning"
                                >
                                    <Typography color="warning" fontWeight="md">
                                        {errorMessage}
                                    </Typography>
                                </Alert>
                            }
                        </Sheet>

                    </div>
                </main>
            </CssVarsProvider>
        </div >
    );
}

const mapStateToProps = (state) => ({
    error: state.session.error,
    isLoggedIn: state.session.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (credentials) => dispatch(createUser(credentials)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
