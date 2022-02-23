# Contact Tracing light
## How to run it
- `npm install` in root, frontend and backend
- `sh docker-container.sh` or 
    ```sh
    docker run --name testneo4j 
        -p7474:7474 
        -p7687:7687 
        -d 
        -v $HOME/neo4j/data:/data 
        -v $HOME/neo4j/logs:/logs 
        -v $HOME/neo4j/import:/var/lib/neo4j/import 
        -v $HOME/neo4j/plugins:/plugins neo4j:latest
    ```
- `node backend/index.js` to start the backend
- `npm start` in frontened folder to start the frontend 

=> website runs on localhost:4200 and backend on localhost:8080

## GitHub repo
https://github.com/LukasGaebler/contact-tracing-light