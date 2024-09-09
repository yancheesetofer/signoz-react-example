import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";

console.log("Initializing tracing...");

const exporter = new OTLPTraceExporter({
  url: "http://152.118.201.243:4318/v1/traces",
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "sample-react-app",
  }),
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register({
  contextManager: new ZoneContextManager(),
});

const documentLoadInstrumentation = new DocumentLoadInstrumentation();
const userInteractionInstrumentation = new UserInteractionInstrumentation();
const fetchInstrumentation = new FetchInstrumentation();

documentLoadInstrumentation.setTracerProvider(provider);
userInteractionInstrumentation.setTracerProvider(provider);
fetchInstrumentation.setTracerProvider(provider);

console.log("Tracing initialized successfully");
