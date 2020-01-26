# Arknights Data GraphQL Server

This was created during my time as a student at Code Chrysalis!

This library sets up an Apollo GraphQL server that serves Arknights operator data. Aside from the default GraphQL playground it also serves a basic sample website that you can use to view and search the data.

View a live demo over at https://glacial-depths-53537.herokuapp.com/.

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

The GraphQL playground and endpoint will be up at `http://localhost:4000/graphql` and the sample website at `http://localhost:4000` by default.

**Select All Operators**

```
query{
    getOperators {
        iid
        name
        rarity
        faction { name }
        class { name }
        race { name }
    }
}
```

**Search Operators** (eg: all Snipers, order by ATK)

```
query($where: OperatorWhereInput, $orderBy: OperatorOrderBy) {
    getOperators(where: $where, orderBy: $orderBy) {
        iid
        name
        rarity
        faction { name }
        class { name }
        race { name }
    }
}
```

```
{
    "where": { class: "Sniper" },
    "orderBy": "atk"
}
```

**Search Operators** (in JavaScript, using axios)

```
const axios = require("axios");
const query = `query($where: OperatorWhereInput, $orderBy: OperatorOrderBy) {
        getOperators(where: $where, orderBy: $orderBy) {
                name
                rarity
                isRanged
                class{name}
                faction{name}
                race{name}
            }
    }`;
const variables = {
        where: { class: "Sniper" },
        orderBy: "atk"
    };
axios.post("/graphql", {
    query: query,
    variables: variables
  }).then(data => data.data.data).then(data => {
    // data is now an array of snipers ordered by atk
    console.log(data);
  }).catch(err => {
    console.log(err);
  });
```

For more detailed information regarding what queries and mutations are available, please check out the docs in the playground at `/graphql`.

# Testing

`yarn test` to run tests. Please note that this re-seeds the database and will destroy all new data.

# Todo

- Fill out data:
  - Other operator info: potential upgrades, stage upgrade costs, range, talents, role tags.
  - Need to scrape for combat skill names, infrastructure skills too.
  - Other useful data: items (and item sources), enemies, missions, pinboard quests, base rooms, furnitures, workshop recipes, factory recipes, trading post orders.
- More tests:
  - Current tests only cover best cases. Need to add testing for fail cases and edge cases (eg. creating or updating with partial inputs, creating or updating with invalid inputs).
- Add feature that keeps track of which operators you currently have and their current stage & level.
