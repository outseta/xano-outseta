# @outseta/xano-outseta

A library to synchronize authentication tokens between Xano and Outseta. This library listens for authentication events from Outseta and updates the Xano auth token accordingly, ensuring that both services remain in sync.

## ❗❗❗ Warning

This library is in early development and should not be used in production environments. The library is not yet feature complete and breaking changes must be expected.

## Installation

To use this library, include it from [jsDelivr](https://www.jsdelivr.com/) in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js"></script>
```

You may also specify a certain version, or version range, using the [jsDelivr version range](https://www.jsdelivr.com/)

## Usage

### Pre-requisites

Before using this library, you need to set up both Outseta and Xano for seamless integration.

1. Ensure you have an Outseta account and taken note of your Outseta sub-domain. Outseta will handle user authentication and provide access tokens that this library uses to sync with Xano.

2. Ensure you have a installed the Outseta Extension in Xano from the Xano Marketplace. The setup creates the necessary endpoints in your Xano workspace to handle the exchange of the Outseta access token for the Xano auth token. Make sure the exchange endpoint path match the path specified in your usage of this library.

### Step 1: Include Prerequisites

You need to include the Outseta and Xano script in the `head` element of your HTML file.

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

### Step 2: Include the Xano Outseta script

After the above dependiencies include the Xano Outseta script, either in the `head` or `body` element of your HTML file.

```html
<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js"></script>
```

### Step 2: Initialize and Use the Xano Outseta script

After including the dependencies and library scripts, initialize the Xano client and call the sync function:

```html
<script>
  // Initialize Xano client with your API group base URL
  const xanoClient = new XanoClient({
    apiGroupBaseUrl: "YOUR_XANO_API_GROUP_BASE_URL",
  });

  // Call the sync function via the specified namespace (default is 'xo')
  xo.syncXanoAuthWithOutseta(xanoClient);
</script>
```

### Script Configuration Options

The log level, exchange endpoint, and namespace can be configured using data attributes on the script tag. Only the log level should be set to a value other than the default if you are not certain of the implications.

1. **Log Level**: Set the `data-log-level` attribute to adjust the verbosity of logs.

   - Supported values: `silent`, `error`, `warn`, `info`
   - Default: `warn`
   - Example: `<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js" data-log-level="warn"></script>`

2. **Exchange Endpoint**: Set the `data-exchange-endpoint` attribute to specify the endpoint for exchanging the tokens.

   - Default: `/outseta/auth`
   - Example: `<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js" data-exchange-endpoint="/my-xano-exchange-endpoint"></script>`

3. **Namespace**: Control the global namespace by setting the `data-namespace` attribute on the script tag.

   - Default: `xo`
   - Example: `<script src="https://cdn.jsdelivr.net/npm/@outseta/xano-outseta@latest/dist/xano-outseta.js" data-namespace="myNamespace"></script>`
