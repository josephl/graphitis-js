// Graphitis.js
// Graphite URL API Handler
// Idealist.org

(function($) {

    Graphitis = function (options, context) {
        if (typeof context !== 'undefined') {
            this.context = context;
        }
        else {
            this.context = this;
        }
        this.options = $.extend(true, {}, options);
        this.generateUrl();
        return this;
    };

    Graphitis.prototype.generateUrl = function() {
        var that = this,
            reqkeys = ['baseUrl', 'targets', 'success'],
            keys = Object.keys(this.options),
            i, ki;
        this.url = '';
        for (i = 0; i < reqkeys.length; i++) {
            ki = keys.indexOf(reqkeys[i]);
            keys.splice(ki, ki !== 0 ? ki : ki + 1);
        }
        if (this.options.baseUrl.match(/^http[s]{0,1}:\/\//) === null) {
            this.url = 'http://' + this.options.baseUrl;
        }
        else {
            this.url = this.options.baseUrl;
        }
        if (this.url.match(/\/$/) === null) {
            this.url += '/';
        }
        this.url += 'render?';
        if (Object.prototype.toString.call(this.options.targets) ===
            '[object Array]') {
            this.url += 'target=' + this.options.targets.join('&target=');
        }
        else {
            this.url += 'target=' + targets;
        }
        keys.forEach(function(key) {
            that.url += '&' + key + '=' + that.options[key];
        });
        if (this.options.format === 'json' &&
            typeof this.options.jsonp === 'undefined') {
            this.url += '&jsonp=?';
        }
        return this;
    };

    Graphitis.prototype.ajax = function() {
        var that = this;
        var ajaxOptions = {
            url: that.url,
            dataType: this.options.format,
            success: this.options.success,
            context: this.context
        };
        if (this.options.format === 'json' &&
            typeof this.options.jsonp === 'undefined') {
            ajaxOptions.jsonp = 'jsonp';
        }
        if (this.options.format === 'raw') {
            ajaxOptions.format = 'text';
        }
        //test
        $.ajax(ajaxOptions);
        return this;
    };

    Graphitis.prototype.set = function(option, value) {
        var objType = Object.prototype.toString.call(option),
            k;
        if (objType === '[object Object]' && typeof value === 'undefined') {
            keys = Object.keys(option);
            for (k = 0; k < keys.length; k++) {
                this.options[keys[k]] = option[keys[k]];
            }
        }
        else if (objType === '[object String]') {
            this.options[option] = value;
        }
        this.generateUrl();
        return this;
    };

    Graphitis.prototype.get = function(key) {
        if (typeof key === 'undefined') {
            return this.options;
        }
        else if (key === 'url') {
            return this.url;
        }
        return this.options[key];
    };

    Graphitis.prototype.size = function() {
        if (typeof this.get('targets') === undefined) {
            return 0;
        }
        return this.get('targets').length;
    }

} (jQuery));
