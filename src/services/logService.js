import * as Sentry from "@sentry/browser";
import config from "../config.json";

/*
HTTP hata kodlari
1XX Informational Responses
2XX Successfull Responses
3XX Redirects Responses
4XX Client Responses
5XX Server Responses
*/
function init() {
  Sentry.init({
    dsn: config.dsn
  });
}

function log(error) {}

export default { init, log };
