import { Logger } from './logger.js';

// 5 log levels
const levels = ['debug', 'info', 'warn', 'error', 'critical'];

// Random message generator
const randomMessage = () => {
  const msgs = [
    "User login successful",
    "Employee data fetched",
    "Warning: Disk space low",
    "Error: Failed API call",
    "Critical: Database down"
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
};

// Generate random log every 2 seconds
setInterval(() => {
  const level = levels[Math.floor(Math.random() * levels.length)];
  const msg = randomMessage();

  Logger[level](msg, { timestamp: new Date().toISOString() });
}, 2000);
