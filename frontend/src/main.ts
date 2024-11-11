import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
 // Updated import
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";
import * as SentryBrowser from "@sentry/browser";

SentryBrowser.init({
    dsn: "https://o4508276569538560.ingest.de.sentry.io/4508276590313552",
    integrations: [SentryBrowser.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
        "localhost",
        /^http:\/\/localhost:4200\//
    ],
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); 