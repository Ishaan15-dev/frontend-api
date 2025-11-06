let fs = null;
let path = null;
let LOG_FILE = null;

// Check if running in Node (not browser)
const isNode = typeof window === 'undefined';

if (isNode) {
  // Use eval('require') to avoid bundling 'fs' and 'path' in browser build
  const nodeRequire = eval('require');
  fs = nodeRequire('fs');
  path = nodeRequire('path');

  const LOG_DIR = '/var/log/frontend';
  LOG_FILE = path.join(LOG_DIR, 'frontend.log');

  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL',
};

const CONSOLE_METHOD = {
  DEBUG: console.debug,
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
  CRITICAL: console.error,
};

const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logObj = {
    time: timestamp,
    level: level,
    job: 'frontend',
    message: message,
    ...(data ? { data } : {}),
  };

  const logLine = JSON.stringify(logObj);

  // Always print to console
  (CONSOLE_METHOD[level] || console.log)(logLine);

  // Write to file only if Node environment
  if (isNode && fs && LOG_FILE) {
    try {
      fs.appendFileSync(LOG_FILE, logLine + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write log:', err.message);
    }
  }
};

export const Logger = {
  debug: (msg, data) => log(LOG_LEVELS.DEBUG, msg, data),
  info: (msg, data) => log(LOG_LEVELS.INFO, msg, data),
  warn: (msg, data) => log(LOG_LEVELS.WARN, msg, data),
  error: (msg, data) => log(LOG_LEVELS.ERROR, msg, data),
  critical: (msg, data) => log(LOG_LEVELS.CRITICAL, msg, data),
};
