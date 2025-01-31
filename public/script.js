const mqttBroker = "ws://protocol.electrocus.com:9001"; // Ensure this matches your MQTT WebSocket setup
const client = mqtt.connect(mqttBroker);

// When connected
client.on("connect", () => {
    console.log("Connected to MQTT via WebSocket");
    client.subscribe("#"); // Subscribe to all topics
});

// Handle incoming messages
client.on("message", (topic, message) => {
    const receivedList = document.getElementById("received-messages");
    const newMessage = document.createElement("li");
    newMessage.textContent = `${topic}: ${message}`;
    receivedList.prepend(newMessage);
});

// Publish message
function publishMessage() {
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value;

    if (topic && message) {
        client.publish(topic, message);

        // Display sent message
        const sentList = document.getElementById("sent-messages");
        const newMessage = document.createElement("li");
        newMessage.textContent = `${topic}: ${message}`;
        sentList.prepend(newMessage);

        // Clear input
        document.getElementById("message").value = "";
    } else {
        alert("Please enter a topic and message.");
    }
}
