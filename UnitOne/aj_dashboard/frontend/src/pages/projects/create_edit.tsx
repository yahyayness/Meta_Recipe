import useBreadcrumb from "../../common/hooks/breadcrumbs";
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useForm} from "../../common/hooks/form";
import {form, useOnSubmitUserForm} from "../users/partials/form";
import FileUploader from "../../components/file-uploader";
import {useOnSubmitProjectForm, useProductFiles} from "./partials/form";

const ProductAddEdit: React.FC = () => {

    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Projects',
            path: "/projects"
        },
        {
            label: 'Create',
            path: "/projects/create",
            isCurrent: true
        }
    ])
    /**
     * form's handler
     * @param values
     * @author Amr
     */
    const onSubmit = (values: any) => {
        console.log(JSON.stringify(values, null, 2));
    }
    /**
     * initialize page's form
     */
    const {formik, fileHandler} = useOnSubmitProjectForm()

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
                        label="Project's Name "
                        id="name"
                        size="small"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik?.touched?.name && Boolean(formik?.errors?.name)}
                        helperText={formik?.touched?.name && formik?.errors?.name}
                        InputLabelProps={{
                            style: {fontSize: '13.45px'}
                        }}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}


                    />
                    <TextField
                        label="Date"
                        id="date"
                        size="small"
                        name="date"
                        type="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik?.touched?.date && formik?.errors?.date}
                        InputLabelProps={{
                            style: {fontSize: '13.45px'},
                            shrink: true,
                        }}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}

                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Description"
                        id="description"
                        size="small"
                        name="description"
                        InputLabelProps={{
                            style: {fontSize: '13.45px'}
                        }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik?.touched?.description && formik?.errors?.description}
                        InputProps={{
                            style: {fontSize: '13.45px'}
                        }}

                    />

                </Grid>
                <Grid container spacing={2} mt={4} ml={2}>
                    <Typography variant="subtitle1">
                        Upload files
                    </Typography>
                </Grid>

                <Grid container spacing={2} mt={1} ml={1}>
                    <FileUploader label='Ingredients' message='Upload Ingredients' field='ingredients'
                                  fileHandler={fileHandler}/>
                    <FileUploader label='Panel files' message='Upload panel files ' field='sensory_panels'
                                  fileHandler={fileHandler}/>

                </Grid>
                <Grid container spacing={2} mt={1} ml={1}>
                    <FileUploader label='Sensor data' message='Upload Sensor Data' field='sensors'
                                  fileHandler={fileHandler}/>
                    <FileUploader label='Lab equipment data' message='upload equipment data' field='equipments'
                                  fileHandler={fileHandler}/>

                </Grid>
                <Grid container spacing={2} mt={1} ml={1}>
                    <FileUploader label='Analytical chemistry' message='Upload analytical chemistry'
                                  field='analytical_chemistry' fileHandler={fileHandler}/>
                    <FileUploader label='Production protocols' message='Select production protocols'
                                  field='production_protocol' fileHandler={fileHandler}/>

                </Grid>

                <Grid item xs={8} ml={1}>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Grid>

            </Grid>


        </Box>


    );
}

export default ProductAddEdit;