import { createLogger } from "./logger.js";

// Update the Xano token whenever the Outseta token changes
export function syncXanoAuthWithOutseta(xanoClient, options = {}) {
  const { endpoint, logLevel } = options;
  const log = createLogger(logLevel, "syncXanoAuthWithOutseta");

  if (typeof Outseta === "undefined") {
    log.error("Outseta SDK is missing. Please include the Outseta SDK script.");
    return;
  }
  if (typeof xanoClient === "undefined") {
    log.error(
      "Xano client is missing. Please pass your Xano client into the function."
    );
    return;
  }
  if (typeof xanoClient.setAuthToken === "undefined") {
    log.error(
      "Xano client is missing the setAuthToken method. Please ensure you are using a valid Xano Client."
    );
    return;
  }

  const exchangeAccessToken = (
    outsetaAccessToken = Outseta.getAccessToken()
  ) => {
    if (outsetaAccessToken) {
      xanoClient
        .post(endpoint, { outsetaAccessToken })
        .then((response) => {
          if (response?.body?.authToken) {
            xanoClient.setAuthToken(response.body.authToken);
            log.info("Xano client updated with exchanged auth token.");
          } else {
            log.error("Xano token missing in exchange response.");
          }
        })
        .catch((error) => {
          log.error("Error exchanging token with Xano:", error);
        });
    } else {
      xanoClient.setAuthToken(null);
      log.info("Xano client token cleared.");
    }
  };

  exchangeAccessToken();

  Outseta.on("accessToken.set", function (decodedToken) {
    exchangeAccessToken();
  });
}
