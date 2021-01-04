import { BackendSrvRequest, getBackendSrv } from "@grafana/runtime";

export class APIClient {
  requestOptions: { headers: any; withCredentials: boolean; url: string };
  constructor(headers: any, withCredentials: boolean, url: string) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url
    };
  }

  request(options) {
    options.withCredentials = this.requestOptions.withCredentials;
    options.headers = this.requestOptions.headers;
    let apiPath = options.url;
    options.url = this.requestOptions.url + apiPath;

    return getBackendSrv().datasourceRequest(options);
  }

  backendAPIRequest(method: string, params: any = {}) {
    const requestOptions: BackendSrvRequest = {
      url: this.backendAPIUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      hideFromInspector: false,
      data: {
        method,
        params
      }
    };

    // Set request options for basic auth
    if (this.requestOptions.basicAuth || this.requestOptions.withCredentials) {
      requestOptions.withCredentials = true;
    }
    if (this.requestOptions.basicAuth) {
      requestOptions.headers.Authorization = this.requestOptions.basicAuth;
    }

    return getBackendSrv().datasourceRequest(requestOptions);
  }
}
