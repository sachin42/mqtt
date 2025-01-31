# Node MQTT Project


## Installation

To install the necessary dependencies, run the following command:


```bash
npm install
```

## Run Configuration

To start the MQTT server with the CLI interface, use the following command:

```bash
npm run start-cli
```

To start the MQTT server with the web interface, use the following command:

```bash
npm run start-web
```

Make sure to configure your environment variables in a `.env` file in the root directory. Here is an example of what the `.env` file might look like:

```
MQTT_BROKER_URL=mqtt://broker.hivemq.com
MQTT_PORT=1883
```

**Note:** Rename the `.env.temp` file to `.env` before running the project.

For development purposes, you can use the following command to start the server with nodemon:

```bash
npm run dev
```

This will automatically restart the server whenever you make changes to the code.




