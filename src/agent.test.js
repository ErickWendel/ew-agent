const { Server } = require('http')
const { deepEqual } = require('assert')
const { spy, assert } = require('sinon')
const response = {
    setHeader: spy(),
    on: () => { }
}

const eventName = 'request'
const expectedCallCount = 2
const expectedZeroCalls = 0
const request = null


const serverInstance = new Server()
serverInstance.emit(eventName, request, response)
assert.callCount(response.setHeader, expectedZeroCalls)


// testing after binding the Agent
require('./agent').start()
serverInstance.emit(eventName, request, response)
assert.callCount(response.setHeader, expectedCallCount)
const [{ args: instrumentedArgs }, { firstArg: requestIdExistent }] = response.setHeader.getCalls()

deepEqual(requestIdExistent, 'X-request-id')
deepEqual(instrumentedArgs, ['X-Instrumented-By', 'ErickWendel'])