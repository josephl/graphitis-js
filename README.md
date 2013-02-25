Graphitis.js
=====
A [jQuery][jquery] library for handling the [Graphite Render URL API][graphite-url-api]. A Graphitis object takes options, generates a compliant URL, and handles the Ajax request.

Options
-----
Each Graphitis object must be supplied with an object containing at least the following values:
* `baseUrl`: string of the base URL to the Graphite server.
* `targets`: array of strings of Graphite metric names.
* `success`: callback function for successful Ajax request.

Get/Set
-----
* The `get(key)` method returns values for the specified option key. If a key is not specified, the entire `options` object is returned. This method is meant to be used strictly for members of the `options` object within the Graphitis object, and not the other direct members of the Graphitis object itself. The exception is specifying `url` as the key to this method, which is not a member of `options`.
* The `set(...)` method allows for the assignment of options with a single key-value pair (e.g. `set('from', '-2d')`) or any number of options by passing an object as the sole argument (e.g. `set({ from: '-2d', until: '-1d' })`). The `url` of the Graphitis object is automatically updated with each `set` call.

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
