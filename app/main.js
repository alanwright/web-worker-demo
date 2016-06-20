var worker;

function startWorker() {
    var prime = document.getElementById('prime');
    if(typeof(worker) !== "undefined") {
        prime.text('Sorry, your browser does not support web workers :(');
        return;
    }
    
    if(typeof(worker) == "undefined") {
        worker = new Worker("app/worker.js");
    }

    // Handle a prime number by appending it to the result div
    worker.onmessage = function(event) {
        prime.innerHTML = event.data;
    };

    worker.postMessage('start');
};

function stopWorker() { 
    worker.terminate();
    worker = undefined;
};

function startNonWorker() {
    var prime = document.getElementById('prime');
    var n = 1, i = 2;

    primes: while (n < 500000000) {
        n += 1;
        for (; i <= Math.sqrt(n); i += 1) { 
            if (n % i == 0) {
                continue primes;
            }
            prime.innerHTML = n;
        }
    }
};