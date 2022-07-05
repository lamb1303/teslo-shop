# Next.js Teslo Shop App
Use Docker to run locally with the following command
``````````
docker-compose up -d
``````````

*  -d: _detached_

* MongoDB URL Local:
mongodb://localhost:27017/teslo-db

## Configuration on the environment variables
* Rename the file .__.env.template__ to __.env__

* Rebuild node modules and run Next
``````````
- npm install
- npm run dev
``````````
## Fill the database with mock fake data

```
- Call: http://localhost:3000/api/seed
```