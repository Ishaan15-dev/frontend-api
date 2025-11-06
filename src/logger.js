let fs = null;
let path = null;
let LOG_FILE = null;

const isNode = typeof window === 'undefined';

if (isNode) {
  // Node.js environment
  fs = await import('fs');
  path = await import('path');
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

  // Only write to file in Node environment
  if (isNode && fs && LOG_FILE) {
    fs.appendFileSync(LOG_FILE, logLine + '\n', 'utf8');
  }
};

export const Logger = {
  debug: (msg, data) => log(LOG_LEVELS.DEBUG, msg, data),
  info: (msg, data) => log(LOG_LEVELS.INFO, msg, data),
  warn: (msg, data) => log(LOG_LEVELS.WARN, msg, data),
  error: (msg, data) => log(LOG_LEVELS.ERROR, msg, data),
  critical: (msg, data) => log(LOG_LEVELS.CRITICAL, msg, data),
};
