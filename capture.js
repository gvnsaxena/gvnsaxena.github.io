(function() {
    let streaming = false;
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;
    let videoConstraints = {
      video:{ 
        facingMode: "environment",
        width: { 
          min: 1280,
         },
         height: {
          min: 720,
         },
      }
    };
  
    const startup = () => {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');
  
      navigator.mediaDevices.getUserMedia(videoConstraints)
      .then(function(stream) {
        video.srcObject = stream;
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          video.setAttribute('width', video.videoWidth);
          video.setAttribute('height', video.videoHeight);
          canvas.setAttribute('width', video.videoWidth);
          canvas.setAttribute('height', video.videoHeight);
          streaming = true;
        }
      }, false);
  
      startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
      
      clearphoto();
    }
  
    const clearphoto = () => {
      let context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      let data = canvas.toDataURL('image/jpeg');
      photo.setAttribute('src', data);
    }
    
    const takepicture = () => {
      let context = canvas.getContext('2d');
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
        let data = canvas.toDataURL('image/jpeg');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  
    window.addEventListener('load', startup, false);
  })();