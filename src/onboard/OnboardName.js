import React, { useEffect, useState } from 'react'
import Header from './../common/Header';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './../registration/Login.css'
import './OnboardName.css'
import { useNavigate } from 'react-router'
import AudioRecordAndPlay from './../pronouncation/AudioRecordAndPlay'
import { upload ,get} from './../Network/Network'
import { SAVE_NAME_PRONOUNCATION ,COUNTRY_URL} from './../common/Common';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function OnboardName() {

    const navigate = useNavigate();
    const [country, setCountry] = useState("Select Country");
    const [countries,setCountries] = useState([]);

    const [showLoader, setShowLoader] = useState(false);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const [onboardName, setOnboardName] = useState({
        "empid": '',
        'firstName': '',
        'lastName': '',
        'preferredName': '',
        'countryCode': ''
    })
    const [savedFile, setSavedFile] = useState();
    const [audioUrl, setAudioUrl] = useState("");

    useEffect(()=>{
        setShowLoader(true);
        get(COUNTRY_URL,(data)=>{
            var response = data.data;
            setCountries(response);
            setShowLoader(false);
        },(error)=>{});
    },[])


    const handleSaveClicked = (event) => {
        if (onboardName.empid == '') {
            showMessage("Employee Id not be empty")
            return;
        }
        if (onboardName.firstName == '') {
            showMessage("First name not be empty")
            return;
        }
        if (onboardName.lastName == '') {
            showMessage("Last name not be empty")
            return;
        }
        if (onboardName.preferredName == '') {
            showMessage("Preferred name not be empty")
            return;
        }

        if(country=='Select Country'){
            showMessage("Please Select Country to proceed")
            return;
        }

        if (audioUrl == '') {
            showMessage("Please record/browse Audio")
            return;
        }
        var formdata = new FormData();
        formdata.append('empId', onboardName.empid);
        formdata.append('fName', onboardName.firstName);
        formdata.append('lName', onboardName.lastName);
        formdata.append('pName', onboardName.preferredName);
        formdata.append('country_code', 'IN');
        formdata.append('created_by', 'admin');
        formdata.append('optedformat', 'STANDARD');
        formdata.append('status', 'ACTIVE');
        formdata.append('modified_by', 'admin');
        formdata.append('channel', 'WEB');
        formdata.append('hasOverridenFile', false);
        formdata.append('multipartFile', savedFile);
        setShowLoader(true);
        upload(SAVE_NAME_PRONOUNCATION, formdata, (data) => {
            console.log(data);
            setShowLoader(false);
            navigate('/dashboard', { replace: true });
        }, (error) => {
            setShowLoader(false);
            console.log(error);
        })
    }


    const showMessage = (message) => {
        alert(message);
    }

    const onAudioRecorded = (url, blob) => {
        setAudioUrl(url);
        console.log(blob);
        var wavefilefromblob = new File([blob], 'filename.wav');
        setSavedFile(wavefilefromblob);

    }

    const handleChange = (event) => {
        onboardName[event.target.id] = event.target.value;
        setOnboardName(onboardName);
    }

    return (
        <Header open={showLoader}>
            <h4>Onboard Name Pronouncation</h4>
            <Container maxWidth="sm" className="centerwindow">
                <Card >
                    <div className="onboardlayout">
                        <TextField id="empid" label="Employee ID" variant="standard" margin="normal" defaultValue={onboardName.empid} onChange={handleChange} />
                        <TextField id="firstName" label="First Name" variant="standard" margin="normal" defaultValue={onboardName.firstName} onChange={handleChange} />
                        <TextField id="lastName" label="Last Name" variant="standard" margin="normal" defaultValue={onboardName.lastName} onChange={handleChange} />
                        <TextField id="preferredName" label="Preferred Name" variant="standard" margin="normal" defaultValue={onboardName.preferredName} onChange={handleChange} />
                        <FormControl >
                            <InputLabel id="countryhint">Select Country</InputLabel>
                            <Select
                                id="countries"
                                value={country}
                                input={<OutlinedInput label="Select Country" />}
                                onChange={handleCountryChange}
                            >
                                <MenuItem value="">
                                    <em>Select Country</em>
                                </MenuItem>
                                {
                                    countries.map((countryInfo) => {
                                        return (<MenuItem value={countryInfo.code}>{countryInfo.name}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                        <AudioRecordAndPlay onAudioFileRecieve={onAudioRecorded} />
                        <div className="rightcontent">
                            <Button variant="outlined" size="medium" onClick={handleSaveClicked}>Save</Button>
                        </div>
                    </div>
                </Card>
            </Container>
        </Header>
    )
}

export default OnboardName