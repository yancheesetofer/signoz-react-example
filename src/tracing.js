const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

// Add otel logging
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR); // set diaglog level to DEBUG when debugging

const exporterOptions = {
  url: "http://152.118.201.243:4318/v1/traces",
};

const traceExporter = new OTLPTraceExporter(exporterOptions);

module.exports = { traceExporter };
