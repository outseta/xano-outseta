import { createLogger } from "./logger.js";
import { syncXanoAuthWithOutseta } from "./syncXanoAuth.js";

// Determine the namespace, log level, and create the logger
const currentScript = document.currentScript;
const namespace = currentScript?.getAttribute("data-namespace") || "xo";
const logLevel = currentScript?.getAttribute("data-log-level") || "warn";
const exchangeEndpoint =
  currentScript?.getAttribute("data-exchange-endpoint") || "/outseta/auth";
const log = createLogger(logLevel);

// Create the namespace on the window object if it doesn't already exist
window[namespace] = window[namespace] || {};

// Attach the function to the namespace
window[namespace].syncXanoAuthWithOutseta = (xanoClient, options) => {
  const combinedOptions = { endpoint: exchangeEndpoint, logLevel, ...options };
  syncXanoAuthWithOutseta(xanoClient, combinedOptions);
};

log.info("Initialized", { namespace, exchangeEndpoint, logLevel });
