//jshint esversion: 6
/*
Author: Anthony Noel

-This page uses the microphone to record your voice
Future Dev:
-Play with this a little bit and see if insteadof making a media recorder it
can all be done with the audio element
-Create a better user interface
*/

//Grab the record and stop button and video
const recordButton = document.querySelector(`button[data-audio=record]`);
const stopButton = document.querySelector(`button[data-audio=stop]`);
const playButton = document.querySelector(`button[data-audio=play]`);
const audio = document.querySelector("audio");
//holds the audio recordings
let audioChunks = [];
//the recorder object used to record the input from the microphone
let mediaRecorder;
//used to hold the url object
let audioURL;


const getAudio = () => {
  //Load the audio player and start recording from the microphone
  navigator.mediaDevices.getUserMedia({audio: true, video: true})
  .then(stream => {
    console.log(stream);
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    console.log("Starting Recording...");
  //Save the audio as it records

  mediaRecorder.ondataavailable = (e) => {
    console.log("Saving audio...");
    audioChunks.push(e.data);
  };
  mediaRecorder.onstop = (e) => {
    if(audioChunks.length > 0) {
      //convert the audio array with chunks into a single blob
      const audioBlob = new Blob(audioChunks);
      //create a url for that single audio data Blob
      audioURL = URL.createObjectURL(audioBlob);
      //reset the chunks again for the next time
      audioChunks = [];
      console.log("Organizing audio...");
    }
  };


  });
};
const startRecording = () => {
    //Starts recording by calling the get audio function
    getAudio();
};

const stopRecording = () => {
  //  Stops the recording of the audio element
    if(mediaRecorder.state === "recording") {
      console.log(mediaRecorder.state);
      mediaRecorder.stop();
      console.log("Stopping Recording...");
      console.log(mediaRecorder.state);

    }

};

const playRecording = () => {
  //Make sure there is an audio url and set it equal to the source of the audio element
    if(audioURL) {
      console.log("Playing audio...");
      audio.src = audioURL;
      audio.play();
    } else {
      console.warn("There is no recorded audio!");
    }
};

const initPage = () => {
  //Set up the event listeners for the butttons
  recordButton.addEventListener("click",startRecording);
  stopButton.addEventListener("click",stopRecording);
  playButton.addEventListener("click", playRecording);
};

initPage();
