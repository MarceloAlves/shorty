# Shorty

A link shortener built using:

- [Next.js](https://github.com/vercel/next.js)
- [ Chakra-UI](https://github.com/chakra-ui/chakra-ui)
- [Prisma](https://github.com/prisma/prisma)
- [MSW](https://github.com/mswjs/msw)
- [Cypress](https://github.com/cypress-io/cypress)
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- [XState](https://github.com/statelyai/xstate)

## Getting Started

### Requirements

- Node 14+
- Yarn (`npm install -g yarn`)
- Docker

### Running the project locally

1. Clone this project
2. Install dependencies

   ```sh
   $ yarn
   ```

3. Start server
   _Note:_ This will automatically run DB migrations before starting the server.

   ```sh
   $ yarn docker:start
   ```

The app will be available at [http://localhost:3001](http://localhost:3001)

To shut down and remove the running containers containers use:

```sh
$ yarn docker:stop
```

### Other Run Options

- `yarn dev` - Start the database container and run the development Next.js server locally. Using this command _will not_ automatically run database migrations. To run migrations yourself, use `yarn db:migrate` after the database is already running.
- `yarn docker:rebuild` - Rebuilds the Docker containers. Use this when changes are made to app files.

### Running Tests

There are two different types of tests available.

For Cypress tests, start the docker container with `yarn docker:start`, then:

To run the Cypress tests without opening the Cypress UI + Browser:

```sh
$ yarn cypress:run
```

If you'd like to open the Cypress UI and manually run the tests:

```sh
$ yarn cypress:open
```

To run the react-testing-library tests:

```sh
$ yarn test
```
