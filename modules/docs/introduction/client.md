## Philosophy

Client applications today are usually peered with a client-side framework like angular, react and vue, and communicate with their backends using rest API's and HTTP requests. HTTP is a transport element, and methodus is all about transports, so we can implement the same approach we use on the server for the client API calls.



In traditional development we will have something to invoke this API like: 
`
return this.http.get(this.configUrl);
`
Which means we explicitly use the GET verb of the HTTP library to make the call. A methodus contract, generated from the backend will provide a class we can use to call the server functions, rather than the undelying HTTP vocabullary, leaving the application free to integrate the transports in different ways.

`
  return serverContract.getConfig();
`