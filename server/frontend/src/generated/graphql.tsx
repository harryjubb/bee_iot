import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  allHives?: Maybe<Array<Maybe<HiveType>>>;
};

export type HiveType = {
  __typename?: 'HiveType';
  id: Scalars['UUID'];
  /** Unique hive ID: to match the same hive across other apiary services */
  uid: Scalars['String'];
  /** Human-friendly hive name */
  name: Scalars['String'];
  /** Short name used for the hive's URL */
  urlName: Scalars['String'];
  /** Determines if any data or streaming should be collected from this hive */
  active: Scalars['Boolean'];
  /** Sponsoring organisation of this hive */
  sponsor?: Maybe<OrganisationType>;
  /** AV stream name for this hive */
  streamKey?: Maybe<Scalars['String']>;
  /** Determines if this hive's stream should be viewable */
  streamActive: Scalars['Boolean'];
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

export type HiveListQueryVariables = Exact<{ [key: string]: never; }>;


export type HiveListQuery = (
  { __typename?: 'Query' }
  & { allHives?: Maybe<Array<Maybe<(
    { __typename?: 'HiveType' }
    & Pick<HiveType, 'id' | 'name' | 'urlName'>
    & { sponsor?: Maybe<(
      { __typename?: 'OrganisationType' }
      & Pick<OrganisationType, 'id' | 'name' | 'logo' | 'sponsorshipLevel'>
    )> }
  )>>> }
);


export const HiveListDocument = gql`
    query HiveList {
  allHives {
    id
    name
    urlName
    sponsor {
      id
      name
      logo
      sponsorshipLevel
    }
  }
}
    `;
export type HiveListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HiveListQuery, HiveListQueryVariables>, 'query'>;

    export const HiveListComponent = (props: HiveListComponentProps) => (
      <ApolloReactComponents.Query<HiveListQuery, HiveListQueryVariables> query={HiveListDocument} {...props} />
    );
    
export type HiveListProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<HiveListQuery, HiveListQueryVariables>
    } & TChildProps;
export function withHiveList<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HiveListQuery,
  HiveListQueryVariables,
  HiveListProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, HiveListQuery, HiveListQueryVariables, HiveListProps<TChildProps, TDataName>>(HiveListDocument, {
      alias: 'hiveList',
      ...operationOptions
    });
};

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
    