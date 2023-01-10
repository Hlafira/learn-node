import { createLogger, format, transports } from "winston";

export function createLocalLogger(procName) {
  const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };
  const dt = new Date();
  const logName = `./log/${procName}-${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}.log`;
  const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.File({ filename: logName })],
  });
  return logger;
}
