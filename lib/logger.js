// Define log levels
const LOG_LEVELS = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
};

// Factory function to create a logger with a specific log level
export function createLogger(logLevel = "info", prefix) {
  const log = {};
  prefix = prefix ? `XO - ${prefix}:` : "XO:";

  Object.keys(LOG_LEVELS).forEach((level) => {
    log[level] = (...messages) => {
      const levelValue = LOG_LEVELS[level];
      const configuredLogLevelValue = LOG_LEVELS[logLevel];

      if (levelValue > 0 && levelValue <= configuredLogLevelValue) {
        console[level](prefix, ...messages);
      }
    };
  });

  return log;
}
