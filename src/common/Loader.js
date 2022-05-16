import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import './Loader.css'
function Loader(props) {
    return (
        <Dialog open={props.open} >
                <center><CircularProgress sx={{p:1}}/></center>
                <Typography variant='body1' sx={{p:1}}>Loading..!</Typography>
        </Dialog>
    )
}

export default Loader