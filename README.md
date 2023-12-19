# sql-auth-fullstack
 <h3> react login backend sql docker </h3>
## Development


### backend

   


    cd backend-node-sql
    yarn
    yarn dev

    

### front

 
    cd my-app
    yarn
    yarn start
   


## Production

```
docker network create fullstack
```
### backend

    <h1>set .env </h1>

    ```bash
    cd backend-node-sql
    docker compose up -d --build
    ```

### front


    ```bash
    cd my-app
    docker compose up -d --build
    ```
