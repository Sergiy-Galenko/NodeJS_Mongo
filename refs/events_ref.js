const Eventemitor = require("events");

class Logger extends Eventemitor {
    log(massage) {
        this.emit("massage", `${massage} ${Date.now()}`);
    }
}

const logger = new Logger();
logger.on("massage", (data) => {
    console.log(data);
});

logger.log("Hello");
