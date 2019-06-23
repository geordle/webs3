document.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      toggleFullScreen();
    }
  }, false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }