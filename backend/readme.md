## Ejecucion manual

Con `npm init` generamos package.json

Para poder usar `npm start` y no estar usando `node index.js`, modificamos package.json añadiendo la linea `"start": "node index.js"` dentro de script antes de test

    "scripts": {
        "start": "node index.js",
        "test":"echo \"Error: no test specified\" && exit 1"
    },

## Ejecucion automatico frente modificaciones

Para automatizar el reinicio del servidoer web y para no estar dandole `Ctrl+C` en cada modificacion, usaremos libreria `nodemon`.

    npm install --save-dev nodemon

Y nos daremos cuenta de que se ha añadido automaticamente en `package.json` la dependencia:

    {
        //...
        "devDependencies": {
            "nodemon": "^3.0.3"
        }
    }

Y con esto, ahora después de cada modificación, solo hay que darle a actualizar la página web. Para ejecutar `nodemon` usamos:

    node_modules/.bin/nodemon index.js

Pero como el comando es muy larga, vamos a personalizarlo añadiendo la linea `"dev": "nodemon index.js",` dentro de la sección `"script"` del `package.json` y nos quedaría una cosa así:

    {   
        // ...
        "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js",
            "test":"echo \"Error: no test specified\" && exit 1"
        },
        // ...
    }

Ahora usaremos comando `npm run dev` para ejecutarlo.

## Instalación de la libreria Express.js

    npm install express

Y nos daremos cuenta de que se ha añadido automaticamente en `package.json` la dependencia:

    {
        //...
        "devDependencies": {
            "nodemon": "^3.0.3"
        }
         "dependencies": {
            "express": "^4.18.2"
        }
    }

## Instalación de librerias socket y cors

    npm install socket.io cors

