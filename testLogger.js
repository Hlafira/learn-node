import { createLogger, format, transports } from "winston";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
const dt = new Date();
const logName = `file-${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}.log`;
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  levels: logLevels,
  transports: [new transports.File({ filename: logName })],
});

logger.info("Some");
const ctx = {
  userId: "090121",
  productId: "creme-de-la-creme",
};

logger.child({ context: ctx }).info('Order "1234" was processed successfully');
