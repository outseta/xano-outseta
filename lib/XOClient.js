import { createLogger } from "./logger.js";

const DEFAULT_OPTIONS = {
  exchangeEndpoint: "/outseta/auth",
  logLevel: "info",
};

class XOClient {
  constructor(xanoClient, options = {}, defaultOptions = DEFAULT_OPTIONS) {
    if (!Outseta || typeof Outseta.getAccessToken !== "function") {
      throw new Error(
        "Invalid global Outseta. Ensure it exists and has a getAccessToken method."
      );
    }
    if (!xanoClient || typeof xanoClient.setAuthToken !== "function") {
      throw new Error(
        "Invalid Xano Client. Ensure it exists and has a setAuthToken method."
      );
    }

    this.xanoClient = xanoClient;
    this.options = { ...defaultOptions, ...options };
    this.log = createLogger(this.options.logLevel);
    this.events = {};

    this.init();
  }

  init() {
    // Listen to Outseta's token set event
    Outseta.on("accessToken.set", () => {
      this.exchangeAccessToken();
    });

    this.log.info("Initialized.");
  }

  async exchangeAccessToken(outsetaAccessToken = Outseta.getAccessToken()) {
    if (!outsetaAccessToken) {
      this.xanoClient.setAuthToken(null);
      this.log.info("Xano client token cleared.");
      this.emit("token.updated", null);
      return;
    }

    try {
      const response = await this.xanoClient.post(
        this.options.exchangeEndpoint,
        {
          outsetaAccessToken,
        }
      );

      const xanoAuthToken = response?.body?.authToken;

      if (xanoAuthToken) {
        this.xanoClient.setAuthToken(xanoAuthToken);
        this.log.info("Xano client updated with exchanged auth token.");
        this.emit("token.updated", { outsetaAccessToken, xanoAuthToken });
      } else {
        this.log.error("Xano token missing in exchange response.");
      }
    } catch (error) {
      this.log.error("Error exchanging token with Xano:", error);
    }
  }

  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event, data) {
    (this.events[event] || []).forEach((callback) => callback(data));
  }
}

export default XOClient;
