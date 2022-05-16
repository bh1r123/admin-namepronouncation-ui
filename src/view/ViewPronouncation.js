import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import './ViewPronouncation.css'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { AUDIO_FILE, APPROVE_URL, REJECT_URL } from './../common/Common'
import { get, post } from './../Network/Network'
import { useParams } from "react-router-dom";
import { SignalCellularNullRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router'

function ViewPronouncation() {
    const { empId } = useParams();
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    const [standeredUrl, setStanderedUrl] = useState("")
    const [standeredUrlBlob, setStanderedUrlBlob] = useState()
    const [overridenUrlBlob, setOverridenUrlBlob] = useState()
    const [overridenUrl, setOverridenUrl] = useState("")

    const handleRejectClicked = (event) => {
        setShowLoader(true);
        post(REJECT_URL + '?empId=' + userInformation.empId, {}, (data) => {
            alert("Rejected Successfully");
            setShowLoader(false);
            navigate('/dashboard',{replace:false})
        }, (error) => {
            alert("Unable to reject due to server error");
            setShowLoader(false);
        })
    }

    const handleApproveClicked = (event) => {
        setShowLoader(true);
        post(APPROVE_URL + '?empId=' + userInformation.empId, {}, (data) => {
            alert("Approved Successfully");
            setShowLoader(false);
            navigate('/dashboard',{replace:false})
        }, (error) => {
            alert("Unable to approve due to server error");
            setShowLoader(false);
        })
    }

    const [userInformation, setUserInformation] = useState({});

    useEffect(() => {
        setShowLoader(true);
        get("http://35.192.143.76:8080/api/v1/npsrecords/getEmpRecord/" + empId, (data) => {
            var response = data.data;
            setUserInformation(response);
            if (userInformation.overridenStatus != 'NEW') {
                loadOverridenFile(response.empId);
            }
            loadFile(response.empId);
            setShowLoader(false);
        }, (error) => {
            setShowLoader(false);
        })
    }, [])


    useEffect(() => {
        if (standeredUrlBlob != null) {
            console.log(standeredUrlBlob);
            var convertedBlob = new Blob([standeredUrlBlob], { type: 'audio/wave' });
            if (convertedBlob.size > 0) {
                var infoUrl = window.URL.createObjectURL(standeredUrlBlob);
                var audio = document.getElementById('streamer');
                // audio.src=infoUrl;
                setStanderedUrl(infoUrl);
            } else {
                setStanderedUrl("")
            }
        }
    }, [standeredUrlBlob])

    useEffect(() => {
        if (overridenUrlBlob != null) {
            console.log(overridenUrlBlob);
            var convertedBlob = new Blob([overridenUrlBlob], { type: 'audio/wave' });
            if (convertedBlob.size > 0) {
                var infoUrl = window.URL.createObjectURL(overridenUrlBlob);
                var audio = document.getElementById('streamer');
                // audio.src=infoUrl;
                setOverridenUrl(infoUrl);
            } else {
                setOverridenUrl("")
            }
        }
    }, [overridenUrlBlob])

    const loadFile = (empId) => {
        (async () => {
            try {
                if (standeredUrl != undefined && standeredUrl != '') {
                    window.URL.revokeObjectURL(standeredUrl);
                }
                // A random doorbell audio sample I found on GitHub
                const newurl = AUDIO_FILE + empId + "&audioFormat=STANDARD";
                // setUrl(newurl);
                const response = await fetch(newurl);
                if (!response.ok) throw new Error(`Response not OK (${response.status})`);
                console.log("Success")
                setStanderedUrlBlob(await response.blob());
                // type="audio/wave"
            }
            catch (ex) {
                // setError(ex instanceof Error ? ex : new Error(String(ex)));
            }
        })();
    }

    const loadOverridenFile = (empId) => {
        (async () => {
            try {
                if (overridenUrl != undefined && overridenUrl != '') {
                    window.URL.revokeObjectURL(overridenUrl);
                }
                // A random doorbell audio sample I found on GitHub
                const newurl = AUDIO_FILE + empId + "&audioFormat=CUSTOM";
                // setUrl(newurl);
                const response = await fetch(newurl);
                if (!response.ok) throw new Error(`Response not OK (${response.status})`);
                console.log("Success")
                setOverridenUrlBlob(await response.blob());
                // type="audio/wave"


            }
            catch (ex) {
                // setError(ex instanceof Error ? ex : new Error(String(ex)));
            }
        })();
    }

    return (
        <Header open={showLoader}>
            <h3>Employee Details</h3>
            {
                Object.keys(userInformation).length > 0 ? (<Container maxWidth="sm" className="centerwindow">
                    <Card >
                        <div className='rowdiv'>
                            <Typography sx={{ m: 1 }} variant='body1'>Employee Id : {userInformation.empId}</Typography>
                            <Typography sx={{ m: 1 }} variant='body1'>Prefered Name : {userInformation.pName}</Typography>
                        </div>
                        <div className='rowdiv'>
                            <Typography sx={{ m: 1 }} variant='body1'>First Name : {userInformation.fName}</Typography>
                            <Typography sx={{ m: 1 }} variant='body1'>Last Name : {userInformation.lName}</Typography>
                        </div>
                        <div className='rowdiv'>
                            <Typography sx={{ m: 1 }} variant='body1'>Country : {userInformation.country_code}</Typography>
                            <Typography sx={{ m: 1 }} variant='body1'>Opted : {userInformation.hasOverridenFile ? "YES" : "NO"}</Typography>
                        </div>

                        <div className='rowdiv'>
                            <Typography sx={{ m: 1 }} variant='body1'>Standered File</Typography>
                            <audio src={standeredUrl} controls />
                        </div>
                        {
                            userInformation.overridenStatus != 'NEW' ? (
                                <div className='rowdiv'>
                                    <Typography sx={{ m: 1 }} variant='body1'>Custom File</Typography>
                                    <audio src={overridenUrl} controls />
                                </div>) : null
                        }

                        {
                            userInformation.overridenStatus == 'PENDING' ? (<div className='rowdiv'>
                                <Button sx={{ m: 1 }} variant="outlined" size="medium" onClick={handleApproveClicked}>Approve</Button>
                                <Button sx={{ m: 1 }} color='error' variant="outlined" size="medium" onClick={handleRejectClicked}>Reject</Button>
                            </div>) : null
                        }
                    </Card>
                </Container>) : null
            }
        </Header>
    )
}

export default ViewPronouncation