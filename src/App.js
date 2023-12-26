// import React, { useState, useRef } from 'react';

// const App = () => {
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [recordedVideoURL, setRecordedVideoURL] = useState(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//       videoRef.current.srcObject = stream;

//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setRecordedChunks((prev) => [...prev, event.data]);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const url = URL.createObjectURL(blob);
//         setRecordedVideoURL(url);
//         console.log("Recorded video URL:", url);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   const handleStartStopClick = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} autoPlay playsInline />
//       <button onClick={handleStartStopClick}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       {recordedVideoURL && (
//         <div>
//           <p>Recorded Video:</p>
//           <video controls src={recordedVideoURL} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import RecordRTC from 'recordrtc';

// const App = () => {
//   const webcamRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [recorder, setRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [downloadLink, setDownloadLink] = useState(null);

//   useEffect(() => {
//     if (recording) {
//       const interval = setInterval(() => {
//         if (recorder) {
//           const blob = recorder.getBlob();
//           setRecordedChunks((prevChunks) => [...prevChunks, blob]);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [recording, recorder]);

//   const startRecording = () => {
//     const webcam = webcamRef.current.video;
//     const newRecorder = RecordRTC(webcam.srcObject, {
//       type: 'video',
//       mimeType: 'video/webm',
//       bitsPerSecond: 128000,
//     });

//     newRecorder.startRecording();
//     setRecording(true);
//     setRecorder(newRecorder);
//   };

//   const stopRecording = () => {
//     setRecording(false);

//     if (recorder) {
//       recorder.stopRecording(() => {
//         const blob = recorder.getBlob();
//         setDownloadLink(URL.createObjectURL(blob));
//       });
//     }
//   };

//   const downloadVideo = () => {
//     if (downloadLink) {
//       const a = document.createElement('a');
//       a.href = downloadLink;
//       a.download = 'recorded-video.webm';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
//   };

//   return (
//     <div>
//       <Webcam ref={webcamRef} />
//       <div>
//         <button onClick={startRecording} disabled={recording}>
//           Start Recording
//         </button>
//         <button onClick={stopRecording} disabled={!recording}>
//           Stop Recording
//         </button>
//         <button onClick={downloadVideo} disabled={!downloadLink}>
//           Download Video
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import RecordRTC from 'recordrtc';

const App = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        if (recorder) {
          const blob = recorder.getBlob();
          // No need to setRecordedChunks if not used
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [recording, recorder]);

  const startRecording = () => {
    const webcam = webcamRef.current.video;
    const newRecorder = RecordRTC(webcam.srcObject, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 128000,
    });

    newRecorder.startRecording();
    setRecording(true);
    setRecorder(newRecorder);
  };

  const stopRecording = () => {
    setRecording(false);

    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        setDownloadLink(URL.createObjectURL(blob));
      });
    }
  };

  const downloadVideo = () => {
    if (downloadLink) {
      const a = document.createElement('a');
      a.href = downloadLink;
      a.download = 'recorded-video.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <div>
        <button onClick={startRecording} disabled={recording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>
        <button onClick={downloadVideo} disabled={!downloadLink}>
          Download Video
        </button>
      </div>
    </div>
  );
};

export default App;
