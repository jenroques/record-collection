import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import { Alert, Sheet, Typography, FormControl, FormLabel, Input, Button, Link } from '@mui/joy';
import WarningIcon from '@mui/icons-material/Warning';

import LogoVid from '../Assets/logovid.mp4';

import { login } from '../Action/actions';

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        dispatch(login(credentials))
            .then(() => {
                history.push("/welcome");
                console.log("Successfully logged in")
                setUsername('');
                setPassword('');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };


    console.log("Is Logged in? ", props.isLoggedIn)

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <CssVarsProvider>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: -2, backgroundColor: '#c3d6c8' }}>
                        <video autoPlay muted
                            style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '10%', minHeight: '10%', maxWidth: '35%', maxHeight: '35%', width: 'auto', height: 'auto', zIndex: -1, borderRadius: 'sm' }}>
                            <source src={LogoVid} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <main style={{ backgroundColor: 'transparent', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        position: 'absolute', top: '49%', left: '47%', transform: 'translate(-50%, -50%)', width: '300px'
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
                                    <b>Welcome!</b>
                                </Typography>
                                <Typography level="body2">Sign in to continue.</Typography>
                            </div>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
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

                            <Button sx={{ mt: 1, backgroundColor: '#c3d6c8', color: 'black' }} onClick={handleSubmit}> Log in </Button>
                            <Typography
                                endDecorator={<Link href="/signup" sx={{ color: "#606761" }}>Sign up</Link>}
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                Don&apos;t have an account?
                            </Typography>
                            {props.error && props.error &&
                                <Alert
                                    startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
                                    variant="outlined"
                                    color="warning"
                                >
                                    <Typography color="warning" fontWeight="md">
                                        {props.error}
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
    login: (credentials) => dispatch(login(credentials)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)
