
# Week 3: Exploring GraphQL as a Client

This week, you'll delve into using GraphQL as a client. The aim is to interact with an existing GraphQL API, focusing on crafting and executing queries to retrieve data. You'll use a public GraphQL API endpoint and learn to make GraphQL calls within a React application.

## Introduction to GraphQL

GraphQL is a powerful query language for APIs, enabling clients to request exactly what they need. This efficiency is a key advantage over traditional REST APIs.

## API Endpoint

All weeks use this GraphQL endpoint:

```
http://cg-dw-prd-mcg-uncommon-raccoon-api.westus2.azurecontainer.io:5000/graphql
```

It is served over plain **HTTP**, which affects two things, both covered in this guide:

1. **Exploring the schema:** web-based tools on HTTPS pages (like Hasura's GraphiQL) can't call an HTTP address, so use Postman instead (next section).
2. **Calling it from your app:** use the Next.js proxy described in *Setting Up Apollo Client* below, so your app keeps working once it's deployed to Vercel (HTTPS).

## Exploring the Schema with Postman

Get familiar with the API before writing code.

- ✅ **Explore the API:**
  - Install [Postman](https://www.postman.com/downloads/) (desktop app).
  - Create a new **GraphQL** request and paste the endpoint above. Postman loads the schema automatically, so you can browse types and fields and autocomplete queries.
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

    First, add a proxy to `next.config.ts`. The API is served over plain HTTP, and browsers block HTTP requests from HTTPS pages (your Vercel deployment). With this rewrite, your app calls its own `/api/graphql` route and the Next.js server forwards the request to the API:

    ```typescript
    import type { NextConfig } from 'next';

    const nextConfig: NextConfig = {
      async rewrites() {
        return [
          {
            source: '/api/graphql',
            destination: 'http://cg-dw-prd-mcg-uncommon-raccoon-api.westus2.azurecontainer.io:5000/graphql',
          },
        ];
      },
    };

    export default nextConfig;
    ```

    Restart `npm run dev` after changing `next.config.ts`.

    Then create `lib/apollo.ts`:

    ```typescript
    import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

    export const client = new ApolloClient({
      link: new HttpLink({ uri: '/api/graphql' }),
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

  - Save this as `components/TaxAssessors.tsx` and render `<TaxAssessors />` in your sidebar. You should see a list of property addresses. If you see `Error: Failed to fetch` or a 404, check that you restarted the dev server after adding the proxy to `next.config.ts`.

- 🌟 **Advanced Tasks:**
  - For those seeking additional challenges, try to integrate Terrain vector Source and Layer to the map.
    - Read [an article](./additional-materials/mapbox-sources-and-layers.md) explaining basic concepts of Mapbox Sources and Layers
    - Incorporate Terrain Data to your Map component


## Resources

- [GraphQL Official Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [How to GraphQL](https://www.howtographql.com/)

This week, focus on grasping the basics of GraphQL queries and integrating them into your React app. Practice with various queries to explore the capabilities of GraphQL.
