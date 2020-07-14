const Http = require('http');
const log = require('pino')();
const { v4: uuid } = require('uuid');
const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
    const [entry] = items.getEntries()
    const item = entry

    log.info({
        name: item.name,
        duration: `${item.duration} ms`,
    });

    performance.clearMarks(item.name);
});

obs.observe({ entryTypes: ['measure'] });


function logRequest({ requestId, msg }) {
    const labelStart = `start-${requestId}`
    const labelEnd = `end-${requestId}`
    const fns = {
        start: () => performance.mark(labelStart),
        finish: () => {
            performance.mark(labelEnd);
            performance.measure(`requestId-${requestId}`, labelStart, labelEnd);
        }
    }

    return fns[msg]()
}



function start() {
    const emit = Http.Server.prototype.emit;
    Http.Server.prototype.emit = function (type) {
        if (type !== 'request') {
            return emit.apply(this, arguments);
        }

        const requestId = uuid()
        logRequest({ requestId, msg: 'start' });

        const [req, res] = [arguments[1], arguments[2]];
        res.on('finish', () => logRequest({ requestId, msg: 'finish' }))
        res.setHeader('X-Instrumented-By', 'ErickWendel')
        res.setHeader('X-request-id', requestId)

        return emit.apply(this, arguments);
    };

}
module.exports = { start }
