const { handleMessage } = require("../src/handlers");

describe("MQTT Message Handler Tests", () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      publish: jest.fn((topic, message, callback) => callback(null))
    };
  });

  test("Handles 'ping' message and publishes 'pong'", () => {
    const topic = "test/ping";
    const message = Buffer.from("ping");

    const result = handleMessage(mockClient, topic, message);
    
    expect(result).toBe("pong");
    expect(mockClient.publish).toHaveBeenCalledWith("response/topic", "pong", expect.any(Function));
  });

  test("Handles 'status' message and publishes system status", () => {
    const topic = "test/status";
    const message = Buffer.from("status");

    const result = handleMessage(mockClient, topic, message);
    
    expect(typeof result).toBe("string");
    expect(result).toContain("system");
    expect(mockClient.publish).toHaveBeenCalled();
  });

  test("Handles JSON 'reset' command and publishes response", () => {
    const topic = "test/json";
    const jsonMessage = Buffer.from(JSON.stringify({ command: "reset" }));

    const result = handleMessage(mockClient, topic, jsonMessage);

    expect(result).toBe("System reset initiated");
    expect(mockClient.publish).toHaveBeenCalledWith("response/topic", "System reset initiated", expect.any(Function));
  });

  test("Handles unknown message without publishing", () => {
    const topic = "test/unknown";
    const message = Buffer.from("random message");

    const result = handleMessage(mockClient, topic, message);

    expect(result).toBe("random message");
    expect(mockClient.publish).not.toHaveBeenCalled();
  });
});
