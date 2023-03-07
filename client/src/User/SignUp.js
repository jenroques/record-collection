import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Alert, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LogoVid from '../Assets/logovid.mp4';

import { createUser, setIsCreated, clearError } from '../Action/actions';

const theme = createTheme();

export const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const error = useSelector((state) => state.user.error);
    const history = useHistory();
    const dispatch = useDispatch();

    console.log("error: ", error)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const userData = { username, password, password_confirmation };
        dispatch(createUser(userData))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    dispatch(setIsCreated(true))
                    history.push("/login");
                    console.log("User Created");
                    setUsername('');
                    setPassword('');
                    setPasswordConfirmation('');
                } else if (response.meta.requestStatus === "rejected") {
                    console.log("Error:", response.error.message);
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

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
                            Sign Up and Start Collecting
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1, mr: 15, ml: 15 }}>
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Confirm Password"
                                type="password"
                                id="password_confirmation"
                                onChange={handlePasswordConfirmationChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'black', backgroundColor: '#c3d6c8' }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Excellent, log in!"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {error &&
                                <Alert
                                    variant="outlined"
                                    color="warning"
                                >
                                    <Typography color="warning" fontWeight="md">
                                        {error}
                                    </Typography>
                                </Alert>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

const mapStateToProps = (state) => ({
    isCreated: state.user.isCreated,
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (userData) => dispatch(createUser(userData)),
    setIsCreated: () => dispatch(setIsCreated()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
