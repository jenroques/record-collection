import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Alert, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LogoVid from '../Assets/logovid.mp4';

import { login, setIsCreated, clearError, fetchCurrentUser, setCurrentUser } from '../Action/actions';

const theme = createTheme();

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        await dispatch(login(credentials))
            .then(() => {
                dispatch(setIsCreated(false));
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
    console.log("Is created? ", props.isCreated)

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#f6f8f9' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                >
                    <Box
                        sx={{
                            mt: 20,
                            ml: 20,

                        }}
                    >
                        <video
                            autoPlay
                            muted
                            style={{
                                position: 'absolute',
                                left: '0',
                                minWidth: '30%',
                                minHeight: '30%',
                                width: '60%',
                                height: '60%',
                                zIndex: '0',
                            }}
                        >
                            <source src={LogoVid} type="video/mp4" />
                        </video>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            mt: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Welcome Record Collector
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Sign in to start sharing collections:
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={handleUsernameChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePasswordChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'black', backgroundColor: '#c3d6c8' }}
                            >
                                Sign In
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {props.error &&
                                <Alert
                                    variant="outlined"
                                    color="warning"
                                >
                                    <Typography color="warning" fontWeight="md">
                                        {props.error}
                                    </Typography>
                                </Alert>
                            }
                            {props.isCreated && (
                                <Alert
                                    variant="outlined"
                                    severity="success"
                                    sx={{ mb: 2 }}
                                >
                                    Account Created, please login with your new account information.
                                </Alert>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

const mapStateToProps = (state) => ({
    error: state.user.error,
    isLoggedIn: state.user.isLoggedIn,
    isCreated: state.user.isCreated,
})

const mapDispatchToProps = (dispatch) => ({
    login: (credentials) => dispatch(login(credentials)),
    setIsCreated: () => dispatch(setIsCreated()),
    clearError: () => dispatch(clearError()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)
