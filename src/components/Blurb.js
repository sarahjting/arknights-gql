import React from "react";
export default function Blurb() {
  return (
    <div className="blurb">
      <h1>arknights-gql</h1>
      <div className="blurb-github">
        <i className="fab fa-github"></i>
        <a href="https://github.com/sarahjting/arknights-gql">
          https://github.com/sarahjting/arknights-gql
        </a>
      </div>
      <div className="blurb-blurb">
        <p>
          arknights-gql is an Apollo GraphQL server that serves Arknights
          character data. This is a sample site that uses its services.
        </p>
        <p>Check the console to see what queries are being run.</p>
        <p>
          You can also <a href="/graphql">check out the playground</a> for
          documentation.
        </p>
      </div>
    </div>
  );
}
