import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a list of all hives */
  allHives?: Maybe<Array<Maybe<HiveType>>>;
  /** Retrieve a single hive by an identifier. One and only one kind of identifier must be specified */
  hive?: Maybe<HiveType>;
};


export type QueryHiveArgs = {
  hiveId?: Maybe<Scalars['String']>;
  hiveUid?: Maybe<Scalars['String']>;
  hiveSlug?: Maybe<Scalars['String']>;
};

export type HiveType = {
  __typename?: 'HiveType';
  id: Scalars['UUID'];
  /** Unique hive ID: to match the same hive across other apiary services */
  uid: Scalars['String'];
  /** Human-friendly hive name */
  name: Scalars['String'];
  /** Short human and URL-friendly name used for the hive's URL */
  slug: Scalars['String'];
  /** Determines if this hive should be accessible publicly */
  active: Scalars['Boolean'];
  /** Sponsoring organisation of this hive */
  sponsor?: Maybe<OrganisationType>;
  /** AV stream name for this hive */
  streamKey?: Maybe<Scalars['String']>;
  /** Determines if this hive's stream should be accessible publicly */
  streamActive: Scalars['Boolean'];
  /** Absolute URL for this hive's HLS stream */
  streamUrl?: Maybe<Scalars['String']>;
};


export type OrganisationType = {
  __typename?: 'OrganisationType';
  id: Scalars['UUID'];
  /** Organisation name */
  name: Scalars['String'];
  /** Image of the logo of the organisation */
  logo?: Maybe<Scalars['String']>;
  /** Sponsorship level of the organisation */
  sponsorshipLevel?: Maybe<OrganisationSponsorshipLevel>;
  /** URL of the organisation */
  url?: Maybe<Scalars['String']>;
  /** Sponsoring organisation of this hive */
  hiveSet: Array<HiveType>;
};

/** An enumeration. */
export enum OrganisationSponsorshipLevel {
  /** Bronze */
  Bronze = 'BRONZE',
  /** Silver */
  Silver = 'SILVER',
  /** Gold */
  Gold = 'GOLD',
  /** Platinum */
  Platinum = 'PLATINUM'
}

export type HiveDetailQueryVariables = Exact<{
  hiveSlug?: Maybe<Scalars['String']>;
}>;


export type HiveDetailQuery = (
  { __typename?: 'Query' }
  & { hive?: Maybe<(
    { __typename?: 'HiveType' }
    & Pick<HiveType, 'id' | 'uid' | 'name' | 'slug' | 'streamKey' | 'streamUrl'>
    & { sponsor?: Maybe<(
      { __typename?: 'OrganisationType' }
      & Pick<OrganisationType, 'id' | 'name' | 'url' | 'logo' | 'sponsorshipLevel'>
    )> }
  )> }
);

export type HiveListQueryVariables = Exact<{ [key: string]: never; }>;


export type HiveListQuery = (
  { __typename?: 'Query' }
  & { allHives?: Maybe<Array<Maybe<(
    { __typename?: 'HiveType' }
    & Pick<HiveType, 'id' | 'name' | 'slug'>
    & { sponsor?: Maybe<(
      { __typename?: 'OrganisationType' }
      & Pick<OrganisationType, 'id' | 'name' | 'logo' | 'sponsorshipLevel'>
    )> }
  )>>> }
);


export const HiveDetailDocument = gql`
    query HiveDetail($hiveSlug: String) {
  hive(hiveSlug: $hiveSlug) {
    id
    uid
    name
    slug
    streamKey
    streamUrl
    sponsor {
      id
      name
      url
      logo
      sponsorshipLevel
    }
  }
}
    `;

/**
 * __useHiveDetailQuery__
 *
 * To run a query within a React component, call `useHiveDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useHiveDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHiveDetailQuery({
 *   variables: {
 *      hiveSlug: // value for 'hiveSlug'
 *   },
 * });
 */
export function useHiveDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HiveDetailQuery, HiveDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<HiveDetailQuery, HiveDetailQueryVariables>(HiveDetailDocument, baseOptions);
      }
export function useHiveDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HiveDetailQuery, HiveDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HiveDetailQuery, HiveDetailQueryVariables>(HiveDetailDocument, baseOptions);
        }
export type HiveDetailQueryHookResult = ReturnType<typeof useHiveDetailQuery>;
export type HiveDetailLazyQueryHookResult = ReturnType<typeof useHiveDetailLazyQuery>;
export type HiveDetailQueryResult = ApolloReactCommon.QueryResult<HiveDetailQuery, HiveDetailQueryVariables>;
export const HiveListDocument = gql`
    query HiveList {
  allHives {
    id
    name
    slug
    sponsor {
      id
      name
      logo
      sponsorshipLevel
    }
  }
}
    `;

/**
 * __useHiveListQuery__
 *
 * To run a query within a React component, call `useHiveListQuery` and pass it any options that fit your needs.
 * When your component renders, `useHiveListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHiveListQuery({
 *   variables: {
 *   },
 * });
 */
export function useHiveListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HiveListQuery, HiveListQueryVariables>) {
        return ApolloReactHooks.useQuery<HiveListQuery, HiveListQueryVariables>(HiveListDocument, baseOptions);
      }
export function useHiveListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HiveListQuery, HiveListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HiveListQuery, HiveListQueryVariables>(HiveListDocument, baseOptions);
        }
export type HiveListQueryHookResult = ReturnType<typeof useHiveListQuery>;
export type HiveListLazyQueryHookResult = ReturnType<typeof useHiveListLazyQuery>;
export type HiveListQueryResult = ApolloReactCommon.QueryResult<HiveListQuery, HiveListQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    