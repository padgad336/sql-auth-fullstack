## Production

```bash
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
