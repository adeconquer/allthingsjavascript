class Stopwatch {#
    startTime;
    // endTime, #duration = 0;
    #
    isRunning = false;
    constructor() {
        this.#startTime = 0
    }

    start() {
        if (isRunning) {
            throw new Error('Stopwatch has already started.')
        }
        isRunning = true;
        startTime = new Date();
    };

    stop() {
        if (!isRunning) {
            throw new Error('Stopwatch is not started.')
        }
        isRunning = false;
        endTime = new Date();
        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds
    };

    reset() {
        startTime = null;
        endTime = null;
        isRunning = false;
        duration = 0;
    };

    // Object.defineProperty(this, 'duration', {
    //     get: function() {
    //         return duration
    //     }
    // });
}