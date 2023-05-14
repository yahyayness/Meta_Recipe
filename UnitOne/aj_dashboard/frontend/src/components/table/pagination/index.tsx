import {Pagination, Stack} from "@mui/material";
import {memo} from "react";
import {useNavigator} from "../../../common/routes";
import {createSearchParams, useLocation} from "react-router-dom";


const AppPagination: React.FC<PaginationPropsType> = ({pages}) => {
    const {navigator} = useNavigator()
    const {pathname} = useLocation();
    const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigator({
            pathname,
            search: `?${createSearchParams(new URLSearchParams({page: value.toString()}))}`,
        })
        // alert(value)
    }
    return (
        <Stack spacing={3} mt={2} direction="row" justifyContent="flex-end"> <Pagination count={pages}
                                                                                         onChange={onChange}/></Stack>
    );
}

export default memo(AppPagination);