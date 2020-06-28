import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
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
        logo
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
      <List>
        {data.allHives
          .sort(hiveSortComparison)
          .map((hive: any, index: number) => (
            <React.Fragment key={hive.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {hive.sponsor?.logo ? (
                    <Avatar alt={hive.sponsor?.name} src={hive.sponsor?.logo} />
                  ) : hive.sponsor ? (
                    <Avatar>{hive.sponsor.name}</Avatar>
                  ) : (
                    <Avatar />
                  )}
                </ListItemAvatar>
                <ListItemText primary={hive.name} />
                {/* {hive.name}
            {hive.sponsor?.name}
            {hive.sponsor?.sponsorshipLevel ?? "N/A"} */}
              </ListItem>

              {index !== data.allHives.length - 1 ? (
                <Divider
                  // variant="inset"
                  component="li"
                />
              ) : null}
            </React.Fragment>
          ))}
      </List>
    </>
  );
}
