/**
 * Simple-minded object of config names and validation functions.
 *
 * For use in tests only.
 */
const configOptions = {
  autoEnable: (value) => ["true", "false"].includes(value),
  automatic: (value) => ["true", "false"].includes(value),
  // Not yet implemented.
  // controlType: (value) => ["buttons", "tabs"].includes(value),
  interval: (value) => !isNaN(value),
  startingIndex: (value) => !isNaN(value),
};

/**
 * Gets a simple key-value of configuration options from URL search parameters.
 */
const getConfigFromQuery = () => {
  const configuration = {};

  if (window.location.search) {
    const paramNames = Object.keys(configOptions);
    const searchParams = new URLSearchParams(window.location.search);
    let paramValue;

    for (const [key, value] of searchParams.entries()) {
      if (!paramNames.includes(key) || !configOptions[key](value)) {
        continue;
      }

      switch (key) {
        case "autoEnable":
        case "automatic":
          paramValue = (value === "true");
          break;

        case "interval":
        case "startingIndex":
          paramValue = parseInt(value);
          break;

        default:
          paramValue = value.toString();
      }
      configuration[key] = paramValue;
    }
  }

  return configuration;
};
