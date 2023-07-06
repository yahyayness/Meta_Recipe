import { Typography } from "@mui/material";

const Dashboard:React.FC = ()=> {
    return (
        <div>
            <Typography variant="h4" marginBottom={4}>Home</Typography>
            <div>
                <Typography variant="h5" marginBottom={2}>User Guide</Typography>
                <Typography variant="body1" marginBottom={2} fontSize={14}>            
                    Welcome to TasteTuner! This user guide provides an introduction to using this web 
                    application in a business-to-business context. Please follow the instructions below to 
                    navigate and utilize the features of the application.
                </Typography>

                <Typography variant="h6" marginBottom={1}>Navigation:</Typography>
                <Typography variant="body1" marginBottom={2} fontSize={14}>
                    On the left pane, you will find a list of icons with labels such as 
                    "Home," "Projects," "Protocols," and more. These icons serve as links to different 
                    pages within the application. To return to the home page, simply click on the "Home" icon.
                </Typography>

                <Typography variant="h6" marginBottom={1}>Managing Projects:</Typography>
                <Typography variant="body1" marginBottom={2} fontSize={14}>
                    To start working on a specific project, navigate to the "Projects" page. From here, you can 
                    create a new project or edit an existing one. Upload the relevant files that form the basis of your 
                    project, and make sure to save your changes.
                </Typography>

                <Typography variant="h6" marginBottom={1}>Editing Protocols:</Typography>
                <Typography variant="body1" marginBottom={2} fontSize={14}>
                    Proceed to the "Protocols" page. Here, you will see a list of your uploaded protocols. For now, select 
                    the "edit" option for one of the protocols within the "Protocol Examples" project. A process flow 
                    diagram will be displayed, illustrating the flow of ingredients and processes involved in creating the 
                    final food or beverage product. You can modify the ingredients, processes, and their interconnections 
                    by manipulating the diagram. Additionally, by clicking on "predict," you can adjust the initial sensory 
                    panel values to align with your preferred experience. Don't forget to save the sensory panel changes. 
                    Observe that the ingredient quantities may adjust accordingly based on your preferences.
                </Typography>

                <Typography variant="h6" marginBottom={1}>Analyzing Reports:</Typography>
                <Typography variant="body1" marginBottom={2} fontSize={14}>
                    Access the "Reports" page to view visual plots that analyze various aspects of the three protocols you 
                    have uploaded.
                </Typography>
            </div>

            <Typography variant="subtitle1" fontSize={12}>
                Please refer to this guide for assistance while using the TasteTuner web application. If you have 
                any further questions or require support, feel free to reach out to our dedicated support team.
            </Typography>
        </div>
    );
}

export default Dashboard;