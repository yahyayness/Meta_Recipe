
import {
    Button,
    FormControl,
    Typography,
    Stack,
    Box,
    Select,
    InputLabel,
    MenuItem
} from "@mui/material";
import { useOnSubmitSetupForm} from './partials/form'
import setupTypes from "./partials/types"
import useBreadcrumb from "../../common/hooks/breadcrumbs";


const Setup: React.FC = () => {
    
    const { LevelOfOperations, CuisineRequirementsProfile, CulinaryCulturalProfile } = setupTypes()
    const {formik} = useOnSubmitSetupForm()

    useBreadcrumb([
        {
            label: 'Setup',
            path: "/setup"
        }
    ])

    return (
        <>
            <Typography   >
                Setup Form
            </Typography>
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
                <Stack
                  
                    sx={{
                        width: '25ch',
                    }}
                    spacing={2}
                  
                >

                    <FormControl key="operation_level" sx={{ m: 0, width: '50ch' }} variant="outlined" size="small">
                        <InputLabel htmlFor="level-of-operations"
                        >Level of operations</InputLabel>
                        <Select
                            labelId="level-of-operations"
                            id="level-of-operations"
                            value={formik.values?.operation_level}
                            label="Level of operations"
                            name="operation_level"
                            onChange={formik.handleChange}
                            error={formik?.touched?.operation_level && Boolean(formik?.errors?.operation_level)}
                         >
                            {LevelOfOperations.map((item) => {
                                return (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl key="cuisine_requirement_profile" sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
                        <InputLabel htmlFor="cuisine-requirements-profile"
                        >Cuisine Requirements Profile</InputLabel>
                        <Select
                            labelId="cuisine-requirements-profile"
                            id="cuisine-requirements-profile"
                            value={formik.values.cuisine_requirement_profile}
                            label="Cuisine Requirements Profile"
                            onChange={formik.handleChange}
                            name="cuisine_requirement_profile"
                        >
                            {CuisineRequirementsProfile.map((item) => {
                                return (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl key="culinary_cultural_profile" sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
                        <InputLabel htmlFor="culinary-cultural-profile"
                        >Culinary Cultural Profile</InputLabel>
                        <Select
                            labelId="culinary-cultural-profile"
                            id="culinary-cultural-profile"
                            value={formik.values.culinary_cultural_profile}
                            label="Culinary Cultural Profile"
                            onChange={formik.handleChange}
                            name="culinary_cultural_profile"
                        >
                            {CulinaryCulturalProfile.map((item) => {
                                return (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button key="submit" type="submit" variant="contained" color="primary">Save</Button>
                </Stack>
            </Box>
        </>
    );
}

export default Setup;
