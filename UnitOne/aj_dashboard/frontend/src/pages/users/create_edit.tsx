import useBreadcrumb from "../../common/hooks/breadcrumbs";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {form, useOnSubmitUserForm, usePasswordAnimation} from './partials/form'
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserType} from "../../types/ModelTypes";
import {http} from "../../plugins/axios";
import {addParamsToEndpoint, getEndpoint} from "../../common/http";
import {ResponseType} from "../../types/HttpTypes";

const ProductAddEdit: React.FC = () => {
    const [user , setUser] = useState<UserType>()

    const {
        showPassword,
        showConfirmedPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClickShowConfirmedPassword,
        handleMouseDownConfirmedPassword
    } = usePasswordAnimation()
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
            isCurrent: true
        }
    ])







    const {formik} = useOnSubmitUserForm()

    return (
        <Box
            component="form"
            marginX={3}
            marginY={5}
            sx={{
                '& .MuiTextField-root': {m: 1, width: '50ch', maxWidth: '100%'},
            }}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <Grid container spacing={1}>

                <Grid item xs={8}>
                    <TextField
                        fullWidth={true}
                        label="First name"
                        id="outlined-size-small"
                        size="small"
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik?.touched?.first_name && formik?.errors?.first_name}
                        InputLabelProps={{
                            style: {fontSize: '13.45px'}
                        }}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}


                    />
                    <TextField
                        fullWidth={true}
                        label="Last name"
                        id="outlined-size-small"
                        size="small"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik?.touched?.last_name && formik?.errors?.last_name}
                        InputLabelProps={{
                            style: {fontSize: '13.45px'}
                        }}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}


                    />

                </Grid>
                <Grid item xs={8}>
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
                            style: {fontSize: '13.45px'}
                        }}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}

                    />
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                        name="email"
                        InputLabelProps={{
                            style: {fontSize: '13.45px'}
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik?.touched?.email && formik?.errors?.email}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}

                    />

                </Grid>
                <Grid item xs={8}>
                    <FormControl sx={{m: 1, width: '50ch'}} variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password" style={{fontSize: '13.45px'}}
                                    color={formik?.touched?.password && formik?.errors?.password ? 'error' : 'info'}>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name='password'
                            value={formik.values.password??''}
                            type={showPassword ? 'text' : 'password'}
                            inputProps={{
                                style: {fontSize: '13.45px'}
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
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText className='error-text'>{formik?.errors?.password}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{m: 1, width: '50ch'}} variant="outlined" size="small">
                        <InputLabel htmlFor="password-confirmation" style={{fontSize: '13.45px'}}
                                    color={formik?.touched?.password_confirmation && formik?.errors?.password_confirmation ? 'error' : 'info'}>Password
                            Confirmation</InputLabel>
                        <OutlinedInput
                            label="Password Confirmation"
                            id="password-confirmation"
                            name='password_confirmation'
                            type={showConfirmedPassword ? 'text' : 'password'}
                            value={formik.values.password_confirmation??''}
                            inputProps={{
                                style: {fontSize: '13.45px'}
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
                                        {showConfirmedPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                        <FormHelperText className='error-text'>{formik?.errors?.password_confirmation}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>

            </Grid>


        </Box>


    );
}

export default ProductAddEdit;