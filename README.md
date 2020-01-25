# Arknights Data GraphQL Server

This was created during my time as a student at Code Chrysalis!

This library sets up an Apollo GraphQL server that serves Arknights operator data. Aside from the default GraphQL playground it also serves a basic client that you can use to view and search the data.

# Installation

1. Clone the repo:

```
git clone https://github.com/sarahjting/arknights-gql.git
```

2. Install packages:

```
yarn
```

3. Set your configurations (fill in `.env` with your database details and preferred port):

```
cp .env.default .env
```

4. Migrate and seed your data:

```
yarn migrate && yarn seed
```

5. Build your assets:

```
yarn build
```

6. Start the server:

```
yarn start
```

# Usage

The GraphQL playground and endpoint will be up at `http://localhost:4000/graphql` and the client up at `http://localhost:4000` by default.

# Testing

`yarn test` to run tests. Please note that this re-seeds the database and will destroy all new data.

# Todo

- Fill out data:
  - Other operator info: potential upgrades, stage upgrade costs, range, talents, role tags.
  - Need to scrape for combat skill names, infrastructure skills too.
  - Other useful data: enemies, missions, pinboard quests, base rooms, furnitures, workshop recipes, factory recipes, trading post orders.
- Add feature that keeps track of which operators you currently have and their current stage & level.
