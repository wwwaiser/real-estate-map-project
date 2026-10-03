
# Week 3: Exploring GraphQL as a Client

This week, you'll delve into using GraphQL as a client. The aim is to interact with an existing GraphQL API, focusing on crafting and executing queries to retrieve data. You'll use a public GraphQL API endpoint and learn to make GraphQL calls within a React application.

## Introduction to GraphQL

GraphQL is a powerful query language for APIs, enabling clients to request exactly what they need. This efficiency is a key advantage over traditional REST APIs.

## API Endpoint

All weeks use this GraphQL endpoint:

```
https://graphql.eng.meridiancapital.com/graphql
```

## Using GraphiQL Interface

Familiarize yourself with the GraphiQL interface, a user-friendly environment to test GraphQL queries.

- ✅ **Explore GraphiQL:**
  - Access [Hasura's Public GraphiQL Interface](https://cloud.hasura.io/public/graphiql).
  - Set the endpoint to `https://graphql.eng.meridiancapital.com/graphql`.
  - Experiment with the schema and practice writing queries.

## Basic GraphQL Queries

Understanding how to craft queries is fundamental in utilizing GraphQL.

- ✅ **Writing Queries:**
  - Construct basic queries. Here's a simple example that fetches tax assessor records:

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

    This query retrieves a list of tax assessor records with each property's address, coordinates, ATTOM ID, and parcel ID.

## Integrating GraphQL in React

Learn to incorporate GraphQL queries in a React application, using the `@apollo/client` library.

- ✅ **Setting Up Apollo Client:**
  - Install the necessary packages:

    ```
    npm install @apollo/client graphql
    ```

  - Initialize Apollo Client in your application. These examples use Apollo Client 4: the client needs an `HttpLink` (the old `uri` shortcut was removed), and React hooks/components are imported from `@apollo/client/react`.

    Create `lib/apollo.ts`:

    ```typescript
    import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

    export const client = new ApolloClient({
      link: new HttpLink({ uri: 'https://graphql.eng.meridiancapital.com/graphql' }),
      cache: new InMemoryCache(),
    });
    ```

    In the Next.js App Router, providers must be Client Components. Create `components/Providers.tsx`:

    ```tsx
    'use client';

    import { ApolloProvider } from '@apollo/client/react';
    import { client } from '@/lib/apollo';

    export default function Providers({ children }: { children: React.ReactNode }) {
      return <ApolloProvider client={client}>{children}</ApolloProvider>;
    }
    ```

    Then wrap `{children}` with `<Providers>` in `app/layout.tsx`.

- ✅ **Making Queries with React:**
  - Use Apollo Client's `useQuery` hook to perform queries within your components:

    ```tsx
    'use client';

    import { gql } from '@apollo/client';
    import { useQuery } from '@apollo/client/react';

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
    
    type TaxAssessor = { PropertyAddressFull: string; ATTOM_ID: string };

    export default function TaxAssessors() {
      const { loading, error, data } = useQuery<{
        attomTaxAssessors: { items: TaxAssessor[] };
      }>(GET_TAX_ASSESSORS);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <div>
          {data?.attomTaxAssessors.items.map(({ PropertyAddressFull, ATTOM_ID }) => (
            <p key={ATTOM_ID}>{PropertyAddressFull}</p>
          ))}
        </div>
      );
    }
    ```

  - Save this as `components/TaxAssessors.tsx` and render `<TaxAssessors />` in your sidebar. You should see a list of property addresses.

- 🌟 **Advanced Tasks:**
  - For those seeking additional challenges, try to integrate Terrain vector Source and Layer to the map.
    - Read [an article](./additional-materials/mapbox-sources-and-layers.md) explaining basic concepts of Mapbox Sources and Layers
    - Incorporate Terrain Data to your Map component


## Resources

- [GraphQL Official Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [How to GraphQL](https://www.howtographql.com/)

This week, focus on grasping the basics of GraphQL queries and integrating them into your React app. Practice with various queries to explore the capabilities of GraphQL.
