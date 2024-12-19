# @outseta/xano-outseta

A library to synchronize authentication tokens between Xano and Outseta. This library listens for authentication events from Outseta and updates the Xano auth token accordingly, ensuring that both services remain in sync.

## ❗❗❗ Warning

This library is in early development (alpha) and should not be used in production environments. New feature will be added and breaking changes may occur.

## Stay Updated

Stay updated on all things Xano + Outseta, sign up for the [Xano + Outseta Email List](https://go.outseta.com/email/lists/rQVvjkQ6/subscribe).

## Quick Start

Copy the below code and paste it in your HTML file. Replace `YOUR_SUBDOMAIN` with your Outseta sub-domain and `YOU_XANO_API_GROUP_BASE_URL` with your Xano API group base URL.

```html
<!-- Outseta Configuration -->
<script>
  var o_options = {
    domain: "YOUR_SUBDOMAIN.outseta.com",
  };
</script>

<!-- Include Outseta -->
<script src="https://cdn.outseta.com/outseta.min.js"></script>

<!-- The above should be in the head element,
 while the below can be in the head or in the body  -->

<!-- Include Xano -->
<script src="https://cdn.jsdelivr.net/npm/@xano/js-sdk@latest/dist/xano.min.js"></script>

<!-- Include Xano + Outseta Integration -->
<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js"></script>

<!-- Initialize your Xano client -->
<script>
  const xanoClient = new XanoClient({
    apiGroupBaseUrl: "YOU_XANO_API_GROUP_BASE_URL",
  });
</script>

<!-- Initialize the XO (Xano + Outseta) Client -->
<script>
  const xoClient = new XOClient(xanoClient, { logLevel: "info" });

  xoClient.on("token.updated", (tokens) => {
    if (tokens) {
      console.log("Tokens Updated", tokens);
      // Do whatever needs to be done,
      // like refreshing authenticated data.
    } else {
      console.log("Tokens Cleared", tokens);
      // Do whatever needs to be done,
      // like clearing authenticated data.
    }
  });
</script>
```

---

## Installation

To use this library, include it from [jsDelivr](https://www.jsdelivr.com/) in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js"></script>
```

You may also specify a certain version, or version range, using the [jsDelivr version range](https://www.jsdelivr.com/)

## Usage

### Pre-requisites

Before using this library, you need to set up both Outseta and Xano accounts.

1. Ensure you have an Outseta account and taken note of your Outseta sub-domain. Outseta will handle user authentication and provide access tokens that this library uses to sync with Xano.

2. Ensure you have a installed the Outseta Extension in Xano from the Xano Marketplace. The setup creates the necessary endpoints in your Xano workspace to handle the exchange of the Outseta access token for the Xano auth token. Make sure the exchange endpoint path match the path specified in your usage of this library.

### Step 1: Setup Outseta and Xano

First step is to include the Outseta and Xano scripts:

```html
<!-- Outseta Configuration -->
<script>
  var o_options = {
    domain: "YOUR_SUBDOMAIN.outseta.com",
  };
</script>

<!-- Include Outseta -->
<script src="https://cdn.outseta.com/outseta.min.js"></script>

<!-- Include Xano -->
<script src="https://cdn.jsdelivr.net/npm/@xano/js-sdk@latest/dist/xano.min.js"></script>
```

Then initialize your Xano client:

```html
<!-- Initialize your Xano client -->
<script>
  const xanoClient = new XanoClient({
    apiGroupBaseUrl: "YOU_XANO_API_GROUP_BASE_URL",
  });
</script>
```

### Step 2: Set up the Xano + Outseta Integration

It's time to integrate the two!

Include the Xano Outseta integration script:

```html
<!-- Include Xano + Outseta Integration -->
<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js"></script>
```

Then initialize the XO (Xano + Outseta) Client:

```html
<!-- Initialize the XO (Xano + Outseta) Client -->
<script>
  const xoClient = new XOClient(xanoClient);

  xoClient.on("token.updated", (tokens) => {
    if (tokens) {
      console.log("Tokens Updated", tokens);
      // Do whatever needs to be done,
      // like refreshing authenticated data.
    } else {
      console.log("Tokens Cleared", tokens);
      // Do whatever needs to be done,
      // like clearing authenticated data.
    }
  });
</script>
```

### Options

The log level and exchange endpoint may be configured using an options object when instantiating the XOClient.

1. **Log Level**: `logLevel`

   - Supported values: `silent`, `error`, `warn`, `info`
   - Default: `warn`

2. **Exchange Endpoint**: `exchangeEndpoint`

   - The path to the Xano endpoint that exchanges the Outseta access token for the Xano auth token.
   - Default: `/outseta/auth`

### Example

```html
<script>
  const xoClient = new XOClient(xanoClient, {
    logLevel: "info",
    exchangeEndpoint: "/your/exchange/endpoint",
  });
</script>
```
