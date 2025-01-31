const mqtt = require("mqtt");
const { brokerUrl, topic } = require("./config");
const { logInfo, logError } = require("./utils");
const { handleMessage } = require("./handlers");

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  logInfo(`Connected to MQTT Broker: ${brokerUrl}`);
  client.subscribe(topic, (err) => {
    if (err) logError("Subscription error: " + err);
    else logInfo(`Subscribed to topic: ${topic}`);
  });
});

client.on("message", (receivedTopic, message) => {
//   logInfo(`Received message on ${receivedTopic}: ${message.toString()}`);
  handleMessage(client, receivedTopic, message);
});

client.on("error", (error) => logError("MQTT Error: " + error));

module.exports = client;
