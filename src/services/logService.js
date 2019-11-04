import * as Sentry from "@sentry/browser";
import config from "../config.json";

function init() {
  Sentry.init({
    dsn = config.dsn
  });
}

function log(error) {}

export default { init, log };
