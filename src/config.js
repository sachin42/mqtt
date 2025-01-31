require('dotenv').config();

module.exports = {
  brokerUrl: process.env.MQTT_BROKER_URL || "mqtt://localhost:1883",
  topic: process.env.MQTT_TOPIC || "default/topic"
};
