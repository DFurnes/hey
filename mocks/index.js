var Interfake = require('interfake');
var mock = new Interfake();

mock.get('/hello').body({greeting: 'Hello World!'});
mock.post('/posts').status(201).body({ created : true });

mock.listen(3000);
