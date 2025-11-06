import fs from 'fs';

const logFile = '/var/log/frontend/frontend.log';

function writeLog(level, message) {
  const ts = new Date().toISOString();
  fs.appendFileSync(logFile, `${ts} ${level} ${message}\n`);
}

// Generate test logs
writeLog('ERROR', '🚨 This is a test ERROR log');
writeLog('CRITICAL', '🔥 This is a test CRITICAL log');

console.log('Test ERROR/CRITICAL logs added!');

