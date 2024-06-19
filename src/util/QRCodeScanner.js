import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsQrCodeScan } from "react-icons/bs";

function CameraButton() {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = React.createRef();

  const handleScanToAuthenticate = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // Show the camera feed in a video element
        videoRef.current.srcObject = stream;

        setCameraActive(true);
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    } else {
      console.error("getUserMedia is not supported in this browser");
    }
  };

  return (
    <div>
      {cameraActive ? (
        <div>
          <video ref={videoRef} autoPlay playsInline />
        </div>
      ) : (
        <Button
          variant="transparent"
          className=" border-1 border-white text-white px-5 py-2 d-block d-sm-none"
          onClick={handleScanToAuthenticate}
        >
          <BsQrCodeScan /> Scan To Authenticate
        </Button>
      )}
    </div>
  );
}

export default CameraButton;
