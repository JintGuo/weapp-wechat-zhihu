import LOGLEVEL from '../config'

const LOG_ERR = 1;
const LOG_WARNING = 2;
const LOG_INFO = 3;
const LOG_TRACE = 4;

function logging(loglevel, msg) {
  if (loglevel >= LOGLEVEL) {
    console.log(msg);
  }
}

module.exports.LOG_ERR = LOG_ERR;
module.exports.LOG_WARNING = LOG_WARNING;
module.exports.LOG_INFO = LOG_INFO;
module.exports.LOG_TRACE = LOG_TRACE;

module.exports.logging = logging;