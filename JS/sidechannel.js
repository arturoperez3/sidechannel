var time = [];
var userInformation = [];
var stop = 0;

// The actual measurement loop
function measure_time(seq) {
    var counter = 0;
    if (!stop)
        setTimeout(measure_time, 0, seq + 1);

    var start = performance.now();

    // loop slices are 5ms
    while (performance.now() - start < 5) {
        counter++;
    }
    time[seq] = performance.now();
    userInformation[seq] = counter;
}

// Send time information back to main application
self.onmessage = function(event) {
    if (event.data == "stop") {
        stop = 1;
        postMessage(JSON.stringify([userInformation, time]));
    } else if (event.data == "start") {
        stop = 0;
        setTimeout(measure_time, 0, 0);
    } else if (event.data == "init") {
        for (var i = 0; i < 4000; i++) {
            time[i] = 0;
            userInformation[i] = 0;
        }
    }
}
