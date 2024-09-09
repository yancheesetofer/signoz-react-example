const { traceExporter } = require("./src/tracing");

async function register() {
  const { registerOTel } = await import("@vercel/otel");
  registerOTel({
    serviceName: "Sample React App",
    traceExporter: traceExporter,
  });
}

register().catch(console.error);

module.exports = { register };
