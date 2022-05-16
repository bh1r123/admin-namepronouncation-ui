import { useEffect, useState } from 'react'
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import IconButton from '@mui/material/IconButton';
import AudioRecorder from './AudioRecorder'
import './AudioRecordAndPlay.css'
import Typography from '@mui/material/Typography';

function AudioRecordAndPlay(props) {
    let [audioURL, isRecording, startRecording, stopRecording,blob] = AudioRecorder();
    const [isAudioAvailable, setAudioAvailable] = useState(false);

    useEffect(() => {
        if (audioURL != undefined && audioURL != "") {
            setAudioAvailable(true);
            if(props.onAudioFileRecieve!=undefined){
                props.onAudioFileRecieve(audioURL,blob);
            }
        }else{
            setAudioAvailable(false)
        }
    }, [audioURL]);

    const handlePlayClicked = (event) => {
        startRecording();
        setAudioAvailable(false)
    }

    const handleStopClicked = (event) => {
        stopRecording();
    }

    const renderButton = () => {
        if (isRecording) {
            return (<IconButton
                size="large"
                onClick={handleStopClicked}
                color="inherit">
                <StopCircleSharpIcon color='primary'></StopCircleSharpIcon>
            </IconButton>)
        } else {
            return (<IconButton
                size="large"
                onClick={handlePlayClicked}
                color="inherit">
                <RadioButtonCheckedSharpIcon color='primary'></RadioButtonCheckedSharpIcon>
            </IconButton>)
        }
    }

    return (
        <div className="recordlayout">
            <Typography variant="body1" color="text.secondary">Start Record </Typography>
            {
                renderButton()
            }
            {
                isAudioAvailable? (<audio src={audioURL} controls/>):null
            }
        </div>
    )

}



export default AudioRecordAndPlay
