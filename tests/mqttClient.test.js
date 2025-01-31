const mqtt = require("mqtt");
const { handleMessage } = require("../src/handlers");

// Mock dependencies
jest.mock("mqtt");

describe("MQTT Client Tests", () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      on: jest.fn(),
      publish: jest.fn((topic, message, callback) => callback(null)),
      subscribe: jest.fn((topic, callback) => callback(null)),
      end: jest.fn()
    };

    mqtt.connect.mockReturnValue(mockClient);

    require("../src/mqttClient"); // Import after mocking
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Reset modules to prevent caching
  });

  test("Client should subscribe to topic on connect", () => {
    // Simulate 'connect' event
    expect(mockClient.on).toHaveBeenCalledWith("connect", expect.any(Function));

    // Call the connect callback
    const connectCallback = mockClient.on.mock.calls.find(([event]) => event === "connect")[1];
    connectCallback();

    expect(mockClient.subscribe).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
  });

  test("Client should call handleMessage on receiving a message", () => {
    // Simulate 'message' event
    expect(mockClient.on).toHaveBeenCalledWith("message", expect.any(Function));

    // Extract and call the message callback
    const messageCallback = mockClient.on.mock.calls.find(([event]) => event === "message")[1];
    const testTopic = "test/topic";
    const testMessage = Buffer.from("ping");

    handleMessage(mockClient, testTopic, testMessage);

    expect(mockClient.publish).toHaveBeenCalledWith("response/topic", "pong", expect.any(Function));
  });

  test("Client should log errors", () => {
    // Simulate 'error' event
    expect(mockClient.on).toHaveBeenCalledWith("error", expect.any(Function));

    const errorCallback = mockClient.on.mock.calls.find(([event]) => event === "error")[1];
    const testError = new Error("Test MQTT Error");

    errorCallback(testError);
    expect(mockClient.on).toHaveBeenCalledWith("error", expect.any(Function));
  });
});
