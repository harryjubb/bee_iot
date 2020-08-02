import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useHiveListQuery } from "../generated/graphql";
import { hiveStyles } from "./HiveStyles";
import HiveAvatar from "./HiveAvatar";

const hiveSponsorshipLevelOrdering = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];

const hiveSortComparison = (hiveA: any, hiveB: any) =>
  hiveSponsorshipLevelOrdering.indexOf(
    hiveA.sponsor?.sponsorshipLevel ?? null
  ) <=
    hiveSponsorshipLevelOrdering.indexOf(hiveB.sponsor?.sponsorshipLevel ?? null)
    ? 1
    : -1;

export default function HiveList() {
  const classes = hiveStyles();

  const { loading, error, data } = useHiveListQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Typography variant="h2">Hives</Typography>
      <List>
        {(data?.allHives ?? [])
          .sort(hiveSortComparison)
          .map((hive, index: number) => (
            <React.Fragment key={hive?.id}>
              <ListItem className={classes.hiveListItem}>
                <ListItemAvatar>
                  <HiveAvatar name={hive?.sponsor?.name} logo={hive?.sponsor?.logo} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.hiveName}
                  disableTypography
                  primary={<Typography variant="body1">{hive?.name}</Typography>}
                  secondary={
                    hive?.sponsor?.sponsorshipLevel ? (
                      <Typography
                        variant="overline"
                        className={
                          // @ts-ignore
                          classes[hive?.sponsor?.sponsorshipLevel?.toLowerCase()]
                        }
                      >
                        {hive?.sponsor?.sponsorshipLevel} Sponsored
                      </Typography>
                    ) : null
                  }
                />
                <Button
                  component={RouterLink}
                  to={`/hive/${hive?.slug}`}
                  variant="contained"
                  color="default"
                  size="small"
                >
                  View
                </Button>
              </ListItem>

              {index !== (data?.allHives?.length ?? 0) - 1 ? (
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
