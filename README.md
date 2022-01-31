Testing log4js framework.
When the server starts, the log file will be created, then the paths to try it out are : 
```
http://localhost/info
``` 
``` 
http://localhost/api/random
``` 
``` 
http://localhost/mensajes
``` 
``` 
http://localhost/productos
``` 
``` 
http://localhost/any-other-path-will-give-error
``` 

```
***Commands question one***
```
```
50 conections & 20 request: artillery quick --count 20 -n 50 http://localhost:8080/info
```
```
100 conections & 20 seconds to make requests : autocannon -c 100 -d 20 http://localhost:8080
```
```
***Commands question two***
```
```
node --inspect index.js
```
```
artillery quick --count 20 -n 50 http://localhost:8080/info
```
```
On the browser: chrome://inspect
```