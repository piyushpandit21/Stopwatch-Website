$(document).ready(function() {
  let running = false;
  let startTime;
  let lapStartTime;
  let intervalTimer;
  let lapCounter = 1;

  $("#startStop").click(function() {
    if (!running) {
      startStopwatch();
      $("#startStop").text("Stop");
    } else {
      stopStopwatch();
      $("#startStop").text("Start");
    }
  });

  $("#reset").click(function() {
    resetStopwatch();
  });

  $("#lap").click(function() {
    if (running) {
      addLap();
    }
  });

  function startStopwatch() {
    running = true;
    startTime = Date.now() - (lapStartTime || 0);
    intervalTimer = setInterval(updateStopwatch, 10);
  }

  function stopStopwatch() {
    running = false;
    clearInterval(intervalTimer);
    lapStartTime = Date.now() - startTime;
  }

  function resetStopwatch() {
    running = false;
    clearInterval(intervalTimer);
    lapStartTime = 0;
    lapCounter = 1;
    
    $(".hour, .minute, .second, .millisecond").text("00");
   
    $("#lapList").empty();
    
    $("#startStop").text("Start");
  }
  

  function updateStopwatch() {
    const currentTime = Date.now() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 2);

    $(".hour").text(hours.toString().padStart(2, "0"));
    $(".minute").text(minutes.toString().padStart(2, "0"));
    $(".second").text(seconds.toString().padStart(2, "0"));
    $(".millisecond").text(milliseconds.toString().padStart(2, "0"));
  }

  function addLap() {
    const lapTime = Date.now() - startTime;
    const minutes = Math.floor((lapTime % 3600000) / 60000);
    const seconds = Math.floor((lapTime % 60000) / 1000);
    const milliseconds = (lapTime % 1000).toString().slice(0, 2);

    const lapItem = `<li>Lap ${lapCounter}: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}</li>`;
    $("#lapList").append(lapItem);
    lapCounter++;
  }
});
