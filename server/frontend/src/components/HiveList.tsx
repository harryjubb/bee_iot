import React from "react";
import { Typography } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const HIVES = gql`
  query {
    allHives {
      id
      name
      sponsor {
        id
        name
        sponsorshipLevel
      }
    }
  }
`;

const hiveSponsorshipLevelOrdering = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];

const hiveSortComparison = (hiveA: any, hiveB: any) =>
  hiveSponsorshipLevelOrdering.indexOf(
    hiveA.sponsor?.sponsorshipLevel ?? null
  ) <=
  hiveSponsorshipLevelOrdering.indexOf(hiveB.sponsor?.sponsorshipLevel ?? null)
    ? 1
    : -1;

export default function HiveList() {
  const { loading, error, data } = useQuery(HIVES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Hives
      </Typography>
      {data.allHives.sort(hiveSortComparison).map((hive: any) => (
        <div key={hive.id}>
          {hive.name}
          {hive.sponsor?.name}
          {hive.sponsor?.sponsorshipLevel ?? "N/A"}
        </div>
      ))}
    </>
  );
}
