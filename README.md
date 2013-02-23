Graphitis.js
=====
A [jQuery][jquery] library for handling the [Graphite Render URL API][graphite-url-api]. A Graphitis object takes options, generates a compliant URL, and handles the Ajax request.

Options
-----
Each Graphitis object must be supplied with an object containing at least the following values:
* `baseUrl`: string of the base URL to the Graphite server.
* `targets`: array of strings of Graphite metric names.
* `success`: callback function for successful Ajax request.

Example
-----
```
var graphiteObj = new Graphitis({
    baseUrl: 'http://graphite.example.com',
    targets: ['statsd.counters.requests'],
    success: function(jsonData) {
        console.log(jsonData);
    },
    format: 'json',
    from: '-1d'
});

graphiteObj.ajax();
```

The above example generates the following URL to request data from the Render API 
`http://graphite.example.com/render?target=statsd.counters.requests&format=json&from=-1d`
and makes an Ajax request, calling the `success` callback function upon a successful request.

[graphite]: http://graphite.wikidot.com
[graphite-url-api]: https://graphite.readthedocs.org/en/latest/render_api.html
[jquery]: https://github.com/jquery/jquery
