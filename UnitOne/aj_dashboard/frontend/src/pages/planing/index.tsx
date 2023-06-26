import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from "@mui/material/Modal";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/lab";
import dayjs, {Dayjs} from "dayjs";
import Grid from "@mui/material/Grid";
import {useAlert} from "../../common/hooks/alert";
import {useNavigator} from "../../common/routes";
import {useForm} from "../../common/hooks/form";
import {form} from "./partials/form";
import useBreadcrumb from "../../common/hooks/breadcrumbs";
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Planning: React.FC = () => {

    const {showAlert} = useAlert();
    const {navigator} = useNavigator()

    const [events, setEvents] = useState<any>([]);
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([])
    /**
     * form's handler
     * @param values
     * @author Amr
     */
    const onSubmit = (values: any, {setSubmitting, setErrors}: any) => {
        setEvents((events: any) => [...events, values])
        handleClose()
    }

    /**
     * initialize page's form
     */
    let {formik, initialValues} = useForm(form(false), onSubmit)

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onDateClick = (info: any) => {
        setValue((value) => dayjs(info.dateStr,'MM/DD/YYYY'))
        handleOpen();
    }

    function handleEventCreate(eventInfo: any) {
        const {title, start, end} = eventInfo;

        // Create a new event object
        const newEvent = {
            title: title,
            start: start,
            end: end,
        };
        handleOpen();

        // Update the events state with the new event
        setEvents((prevEvents: any) => [...prevEvents, newEvent]);
    }


    function handleDateClick(arg: any) {
        // arg.date contains the clicked date
        console.log('Clicked date:', arg.date);
    }

    return (

        <div>
            <React.Fragment>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{...style, width: 600}} className="focus-visible no-border">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1},
                            }}

                            autoComplete="off"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    fullWidth
                                    name='title'
                                    label="Title"
                                    multiline
                                    maxRows={4}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik?.touched?.title && Boolean(formik?.errors?.title)}
                                    helperText={formik?.touched?.title && formik?.errors?.title}
                                    InputLabelProps={{
                                        style: {fontSize: '13.45px'},
                                    }}
                                    InputProps={{
                                        style: {fontSize: '13.45px'}
                                    }}
                                />
                            </div>

                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        type='date'
                                        id="outlined-multiline-static"
                                        label="Start"
                                        name='start'
                                        value={formik.values.start}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.start && Boolean(formik?.errors?.start)}
                                        helperText={formik?.touched?.start && formik?.errors?.start}
                                        InputLabelProps={{
                                            style: {fontSize: '13.45px'},
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            style: {fontSize: '13.45px'}
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={2} direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <div  className="center to">To</div>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        type='date'
                                        id="outlined-multiline-static"
                                        label="End"
                                        name='end'
                                        value={formik.values.end}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.end && Boolean(formik?.errors?.end)}
                                        helperText={formik?.touched?.to && formik?.errors?.end}
                                        InputLabelProps={{
                                            style: {fontSize: '13.45px'},
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            style: {fontSize: '13.45px'}
                                        }}

                                    />
                                </Grid>
                            </Grid>
                            <div>

                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    InputLabelProps={{
                                        style: {fontSize: '13.45px'},
                                    }}
                                    InputProps={{
                                        style: {fontSize: '13.45px'}
                                    }}

                                />
                            </div>
                            <Button type="submit" color="primary">Save</Button>
                        </Box>

                    </Box>
                </Modal>
            </React.Fragment>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={onDateClick}

            />
        </div>

    );
}

export default Planning;
