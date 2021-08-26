# An unofficial `javaScript-questions` API

## Description

An unofficial API of a well-known repository [
javascript-questions ](https://github.com/lydiahallie/javascript-questions), made with ❤️

## Live demo

Have a look at [Documentation](https://javascript-questions-api.herokuapp.com/docs/)

![image](docs/preview.png)

## Installation

1. Clone this repo
2. Run `yarn` or `npm install` to install dependencies

```bash
$ yarn
```

3. Prepare a postgres database, or create a new one with docker-compose

```bash
$ docker-compose up -d
```

4. Migrate and seed the database

```bash
$ npx mikro-orm migration:up
$ npx mikro-orm seeder:run
```

5. Create a `.env` file based on `.env.example`, e.g.

```text
NODE_ENV=production
PORT=3000
POSTGRES_URL=postgresql://postgres:javascript-questions-api@localhost:5432/postgres
SSL_CONNECTION=true
```

7. Start server

```bash
$ yarn start:prod
```

## License

[MIT licensed](LICENSE).
