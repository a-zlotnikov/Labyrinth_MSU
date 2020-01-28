import React, {Component} from 'react';
import classes from './Webcam.module.css';
import Webcam from 'react-webcam';

class Video extends Component {
  render() {
    const videoConstraints = {
      facingMode: 'user',
    };
    
    return <Webcam videoConstraints={videoConstraints}/>;
  }
}

export default Video;
