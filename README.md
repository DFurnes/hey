<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/583202/23235972/7fdbbbc8-f925-11e6-9781-c6b0e4ae4368.png" width="630" height="auto"> 
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
      },
   
      'basicauth-example-site': {
        url: 'example.com',
        forceSecure: true,
        
        // ↓ Automatically load password from the system keychain and set HTTP Basic Auth
        //   header by using `hey.basicauth()` with the domain name and username.
        auth: hey.basicauth('secure.mcommons.com', 'dfurnes@dosomething.org'),
      },
    },
  };
};

```

### License
MIT &copy; [David Furnes](https://dfurnes.com)
