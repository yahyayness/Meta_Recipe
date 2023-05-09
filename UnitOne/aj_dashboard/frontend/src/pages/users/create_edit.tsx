import useBreadcrumb from "../../common/hooks/breadcrumbs";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {form, usePasswordAnimation} from './partials/form'
import {
    Button,
    FormControl, FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "../../common/hooks/form";


const ProductAddEdit: React.FC = () => {

    const  {showPassword , showConfirmedPassword , handleClickShowPassword , handleMouseDownPassword ,  handleClickShowConfirmedPassword , handleMouseDownConfirmedPassword} =  usePasswordAnimation()
    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Users',
            path: "/users"
        },
        {
            label: 'Create',
            path: "/users/create",
            isCurrent:true
        }
    ])

    const onSubmit = (values:any)=>{
        console.log(JSON.stringify(values, null, 2));
    }

    let { formik } = useForm(form(),onSubmit)


    //
    // const [showPassword, setShowPassword] = React.useState(false);
    //
    //
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    //
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };


    // const classes = useStyles();
    return (
        <Box
            component="form"
            marginX={3}
            marginY={5}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' ,  maxWidth: '100%' },
            }}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <Grid container spacing={1} >

                <Grid item xs={8}>
                    <TextField
                        fullWidth={true}
                        label="Name"
                        id="outlined-size-small"
                        size="small"
                        name="name"
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik?.touched?.name && formik?.errors?.name}
                        InputLabelProps={{
                            style: { fontSize: '13.45px' }
                        }}
                        InputProps={{
                            style: { fontSize: '13.45px' }
                        }}


                    />
                    <TextField
                        label="Username"
                        id="outlined-size-small"
                        size="small"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik?.touched?.username && formik?.errors?.username}
                        InputLabelProps={{
                            style: { fontSize: '13.45px' }
                        }}
                        InputProps={{
                            style: { fontSize: '13.45px' }
                        }}

                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                        name="email"
                        InputLabelProps={{
                            style: { fontSize: '13.45px' }
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik?.touched?.email && formik?.errors?.email}
                        InputProps={{
                            style: { fontSize: '13.45px' }
                        }}

                    />
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined"  size="small">
                        <InputLabel htmlFor="outlined-adornment-password" style={{ fontSize: '13.45px'  }} color={formik?.touched?.password && formik?.errors?.password ? 'error' : 'info'}>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name='password'
                            value={formik.values.password}
                            type={showPassword ? 'text' : 'password'}
                            inputProps={{
                                style: { fontSize: '13.45px' }
                            }}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}

                            endAdornment={
                                <InputAdornment position="end"
                                >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"

                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText className='error-text'>{formik?.errors?.password}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined"  size="small">
                        <InputLabel htmlFor="password-confirmation"  style={{ fontSize: '13.45px'  }}  color={formik?.touched?.password_confirmation && formik?.errors?.password_confirmation ? 'error' : 'info'}>Password Confirmation</InputLabel>
                        <OutlinedInput
                            label="Password Confirmation"
                            id="password-confirmation"
                            name='password_confirmation'
                            type={showConfirmedPassword ? 'text' : 'password'}
                            value={formik.values.password_confirmation}
                            inputProps={{
                                style: { fontSize: '13.45px' }
                            }}
                            onChange={formik.handleChange}
                            error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmedPassword}
                                        onMouseDown={handleMouseDownConfirmedPassword}
                                        edge="end"
                                    >
                                        {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                        <FormHelperText className='error-text'>{formik?.errors?.password_confirmation}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={8} >
                    <Button type="submit" variant="contained" color="primary">Submit</Button>

                </Grid>

            </Grid>


        </Box>


    );
}

export default ProductAddEdit;