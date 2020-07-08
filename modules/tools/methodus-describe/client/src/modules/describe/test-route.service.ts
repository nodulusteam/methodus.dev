import { Injectable } from '@angular/core';
import { Rest } from '@methodus/platform-web';

@Injectable()
export class TestRouteService {
  constructor() {
  }
  _subscriptions = {};
  options: any = {};
  request: any;
  url: string;
  async activate(uri, methodInformation, auth) {
    const argsForRequest = [];
    methodInformation.params.forEach((param) => {
      argsForRequest.push(param.value);
    });

    const restRequest = new Rest(uri, methodInformation.verb,
      methodInformation.params, argsForRequest);
    if (auth) {
      switch (auth.type) {
        case 1:
          restRequest.options.headers = restRequest.options.headers || {};
          const base64HEader = EncodeDecode.b64EncodeUnicode(`${auth.user}:${auth.password}`);
          restRequest.options.headers['Authorization'] = `Basic ${base64HEader}`;
          break;
        case 3:
          restRequest.options.headers = restRequest.options.headers || {};
          restRequest.options.headers['Authorization'] = `Bearer ${auth.token}`
          break;
      }
    }


    const response = await fetch(restRequest.request, restRequest.options);
    return response;
  }

  prepare(url, method, params, body, query, headers) {
    if (params && url) {
      params.forEach(function (param: any) {
        if (url) {
          url = url.replace(':' + param.id, param.value);
        }
      });
    }

    if (query && query.length > 0) {
      url = url + '?' + query.join('&');
    }

    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    // add files

    // add headers
    this.url = url;
    this.request = new Request(url);

    this.options = {
      method: method,
      credentials: 'include',
      headers: Object.assign(headers, {
        'Content-Type': 'application/json'
      }),
      // headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };


    if (body && Object.keys(body).length > 0) {
      Object.assign(this.options, { body: JSON.stringify(body) });
    }
  }






























}
class EncodeDecode {

  static b64EncodeUnicode(str: any) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      // function toSolidBytes(match, p1) {
      (match, p1) => {
        // console.debug('match: ' + match);
        return String.fromCharCode(("0x" + p1) as any);
      }));
  }

  static b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
