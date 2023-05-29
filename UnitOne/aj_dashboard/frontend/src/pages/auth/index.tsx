import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useOnSubmitLoginForm} from './partials/form'


/**
 * redirect user to this page after login
 * @author Amr
 */
export const REDIRECT_LINK:string = "/products"


const Login:React.FC = ()=>{
    const {formik , validationMessage} = useOnSubmitLoginForm(REDIRECT_LINK);
    return (
        <Box

            sx={{

                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }} width={1/4} maxWidth={1}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={(formik.touched.username && Boolean(formik.errors.username) )|| Boolean(validationMessage)}
                    helperText={formik?.touched?.username && formik?.errors?.username}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={(formik.touched.password && Boolean(formik.errors.password) ) || Boolean(validationMessage)}
                    helperText={(formik?.touched?.password && formik?.errors?.password) || validationMessage}
                />
                <FormControlLabel
                    style={{display:'none'}}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container style={{display:'none'}}>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Login;