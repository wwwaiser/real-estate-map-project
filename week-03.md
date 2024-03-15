
# Week 3: Exploring GraphQL as a Client

This week, you'll delve into using GraphQL as a client. The aim is to interact with an existing GraphQL API, focusing on crafting and executing queries to retrieve data. You'll use a public GraphQL API endpoint and learn to make GraphQL calls within a React application.

## Introduction to GraphQL

GraphQL is a powerful query language for APIs, enabling clients to request exactly what they need. This efficiency is a key advantage over traditional REST APIs.

## Using GraphiQL Interface

Familiarize yourself with the GraphiQL interface, a user-friendly environment to test GraphQL queries.

- ✅ **Explore GraphiQL:**
  - Access [Hasura's Public GraphiQL Interface](https://cloud.hasura.io/public/graphiql).
  - Set the endpoint to `https://graphql.eng.meridiancapital.com/graphql`.
  - Experiment with the schema and practice writing queries.

## Basic GraphQL Queries

Understanding how to craft queries is fundamental in utilizing GraphQL.

- ✅ **Writing Queries:**
  - Construct basic queries. Here's a simple example that fetches user information:

    ```
    query {
      attomTaxAssessors {
        items {
          PropertyAddressFull
          PropertyLatitude
          PropertyLongitude
          ATTOM_ID
          parcel_id
        }
      }
    }
    ```

    This query retrieves a list of users with their `id`, `name`, and `email`.

## Integrating GraphQL in React

Learn to incorporate GraphQL queries in a React application, using the `@apollo/client` library.

- ✅ **Setting Up Apollo Client:**
  - Install the necessary packages:

    ```
    npm install @apollo/client graphql
    ```

  - Initialize Apollo Client in your application:

    ```javascript
    import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

    const client = new ApolloClient({
      uri: 'https://graphql.eng.meridiancapital.com/graphql',
      cache: new InMemoryCache(),
    });

    function App() {
      return (
        <ApolloProvider client={client}>
          {/* Components will go here */}
        </ApolloProvider>
      );
    }
    ```

- ✅ **Making Queries with React:**
  - Use Apollo Client's `useQuery` hook to perform queries within your components:

    ```javascript
    import { useQuery, gql } from '@apollo/client';

    const GET_TAX_ASSESSORS = gql`
      query {
        attomTaxAssessors {
          items {
            PropertyAddressFull
            PropertyLatitude
            PropertyLongitude
            ATTOM_ID
            parcel_id
          }
        }
      }
    `;
    
    function TaxAssessors() {
      const { loading, error, data } = useQuery(GET_TAX_ASSESSORS);
  
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
  
      return (
        <div>
          {data.attomTaxAssessors.items.map(({ PropertyAddressFull }, index) => (
            <div key={index}>
              <p>{PropertyAddressFull}</p>
            </div>
          ))}
        </div>
      );
    }
    ```

## Resources

- [GraphQL Official Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [How to GraphQL](https://www.howtographql.com/)

This week, focus on grasping the basics of GraphQL queries and integrating them into your React app. Practice with various queries to explore the capabilities of GraphQL.
