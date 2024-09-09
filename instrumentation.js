const { registerOTel } = require("@vercel/otel");
const { traceExporter } = require("./src/tracing");

function register() {
  registerOTel({
    serviceName: "Sample React App",
    traceExporter: traceExporter,
  });
}

module.exports = { register };
