
document.addEventListener("keypress", function(e) {
    console.log(e);
    if (e.key === "Enter"){
      toggleFullScreen();
    }
  }, false);

  function toggleFullScreen() {
      
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }

export default {};
