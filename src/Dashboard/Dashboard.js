import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../common/Header';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { get, deleteRecord } from './../Network/Network';
import { FETCH_ALL_RECORDS, DELETE_URL } from './../common/Common';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import './Dashboard.css'
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

function Dashboard() {

    const navigate = useNavigate();

    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        loadPronouncations()
    }, [])

    const loadPronouncations = () => {
        setShowLoader(true);
        get(FETCH_ALL_RECORDS, (data) => {
            console.log(data);
            var response = data.data.npsList;
            var namePronouncations = [];
            response.map((info) => {
                let pronunce = {
                    empId: info.empId,
                    firstName: info.first_name,
                    lastName: info.last_name,
                    preferredName: info.preferred_name,
                    country: info.country
                };
                namePronouncations.push(pronunce);
            })
            setPronouncations(namePronouncations)
            setShowLoader(false);
            setLoaded(true)
        }, (error) => {
            console.log(error);
            setShowLoader(false);
        })
    }

    const [pronouncations, setPronouncations] = useState([])

    const [loaded, setLoaded] = useState(false);

    const handleClick = (data, type) => {
        console.log("data,type", data, type);
        if (type == 'delete') {
            setShowLoader(true);
            deleteRecord(DELETE_URL + data.empId, (data) => {
                setShowLoader(false);
                loadPronouncations()
            }, (error) => {
                setShowLoader(false);
            })
        }else if(type =='view'){
            navigate('/view/'+data.empId,{replace:false})
        }
    }

    const handleOnboardClicked = (event) => {
        navigate("/onboard", { replace: false })
    }


    return (
        <div>

            <Header open={showLoader}>
                <div className='onboarddiv'>
                    <Button variant="contained" size="medium" onClick={handleOnboardClicked}>Onboard Name Pronouncation</Button>
                </div>
                {
                    loaded ? (<TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Employee Id</TableCell>
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    <TableCell align="center">Preferred Name</TableCell>
                                    <TableCell align="center">Country</TableCell>
                                    <TableCell align="center">View</TableCell>
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pronouncations.length > 0 ? (pronouncations.map((pronouncation) => (
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {pronouncation.empId}
                                        </TableCell>
                                        <TableCell align="center">{pronouncation.firstName}</TableCell>
                                        <TableCell align="center">{pronouncation.lastName}</TableCell>
                                        <TableCell align="center">{pronouncation.preferredName}</TableCell>
                                        <TableCell align="center">{pronouncation.country}</TableCell>
                                        <TableCell align="center">
                                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={(event) => {
                                                handleClick(pronouncation, 'view')
                                            }} >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={(event) => {
                                                handleClick(pronouncation, 'edit')
                                            }}>
                                                <ModeEditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={(event) => {
                                                handleClick(pronouncation, 'delete')
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))) : <Typography variant='body1' >No Records Found</Typography>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>) : null
                }
            </Header>
        </div>
    )
}

export default Dashboard