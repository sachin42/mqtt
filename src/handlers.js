const { logInfo, logError } = require("./utils");

/**
 * Handles incoming MQTT messages and publishes responses if necessary.
 * @param {object} client - The MQTT client instance.
 * @param {string} topic - The MQTT topic.
 * @param {Buffer} message - The message payload.
 */
const handleMessage = (client, topic, message) => {
  try {
    const msgString = message.toString();
    logInfo(`Processing message from ${topic}: ${msgString}`);

    let responseTopic = "response/topic";
    let responseMessage = null;

    if (msgString === "ping") {
      responseMessage = "pong";
    } else if (msgString === "status") {
      responseMessage = JSON.stringify({ system: "online", uptime: process.uptime() });
    } else if (msgString.startsWith("{")) {
      const parsedData = JSON.parse(msgString);
      logInfo(`Parsed Data: ${JSON.stringify(parsedData)}`);

      if (parsedData.command === "reset") {
        responseMessage = "System reset initiated";
      }
    }

    // Publish response if applicable
    if (responseMessage) {
      client.publish(responseTopic, responseMessage, (err) => {
        if (err) logError(`Failed to publish response: ${err.message}`);
        else logInfo(`Published response to ${responseTopic}: ${responseMessage}`);
      });
    }

    return responseMessage || msgString;
  } catch (error) {
    logError(`Error handling message: ${error.message}`);
    return null;
  }
};

module.exports = { handleMessage };

