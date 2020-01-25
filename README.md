# Arknights GraphQL API

This was created during my time as a student at Code Chrysalis!

This library sets up an Apollo GraphQL Server that serves Arknights character data. Aside from the default GraphQL playground it also serves a basic client that you can use to view and manage this data (currently on the to do list).

# Installation

1. Clone the repo:

```
git clone https://github.com/sarahjting/arknights-gql.git
```

2. Install packages:

```
yarn
```

3. Build:

```
yarn build
```

4. Set your configurations (fill in `.env` with your database details and preferred port):

```
cp .env.default .env
```

5. Start the server:

```
yarn start
```

# Usage

The GraphQL playground and endpoint should be up at `http://localhost:4000/graphql` and the client up at `http://localhost:4000` by default.

# Todo

- Write code for client.
- Fill out data:
  - Other operator info: images, potential upgrades, stage upgrade costs, range, talents, role tags.
  - Need to scrape for combat skill names, infrastructure skills too.
  - Other useful data: enemies, missions, pinboard quests, base rooms, furnitures, workshop recipes, factory recipes, trading post orders.
- Create feature that keeps track of which operators you currently have and their current stage & level.
