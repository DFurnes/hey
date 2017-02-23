<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/583202/23245946/5ce91938-f95e-11e6-9ee6-0eac79a5d9e4.png" width="630" height="auto"> 
</p>

<p align="center">
  <strong>hey (n.)</strong> – A handy command-line tool for making HTTP requests.
</p>

### Installation
You can install __Hey__ using [npm](https://npmjs.org):

```
npm install -g @dfurnes/hey
```

### Customization
You can set aliases and default request options by creating a `.hey.js` file in your home directory. For example:

```js
module.exports = function(hey) {
  return {
    projects: {
      // ↓ You can add aliases for favorite sites, so you can just
      //   type `hey get example/page` to load "www.example.com/page`!
      'example': {
        url: 'www.example.com',
        
        // ↓ If a site should always use HTTPS, set the `forceSecure` flag!
        forceSecure: true,

        // ↓ You can set default headers to be used on all requests:
        headers: {
          'X-Secret-API-Key': '5RROHSzXQwJ9douud9u5Ln4BR'
        },
      },
   
      'basicauth-example-site': {
        url: 'example.com',
        forceSecure: true,
        
        // ↓ Automatically load password from the system keychain and set HTTP Basic Auth
        //   header by using `hey.basicauth('<username>')`. Will prompt on first request.
        auth: hey.basicauth('username@example.com'),
      },
    },
  };
};

```

### License
MIT &copy; [David Furnes](https://dfurnes.com)
