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
import { useHiveListQuery, HiveType } from "../generated/graphql";
import { hiveStyles } from "./HiveStyles";
import HiveAvatar from "./HiveAvatar";
import { hiveSponsorshipLevelOrdering } from "./sponsorship";


const hiveSponsorshipComparison = (hiveA: any, hiveB: any) => {
  // Sort by sponsorship level
  if (hiveA?.sponsor?.sponsorshipLevel !== hiveB?.sponsor?.sponsorshipLevel) {
    return hiveSponsorshipLevelOrdering.indexOf(
      hiveA?.sponsor?.sponsorshipLevel ?? ''
    ) <=
      hiveSponsorshipLevelOrdering.indexOf(hiveB?.sponsor?.sponsorshipLevel ?? '')
      ? 1
      : -1;
  }
  // Sort by name as tie breaker
  return (hiveA?.name ?? 1) >= (hiveB?.name ?? 1) ? 1 : -1
}

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
          .slice()
          .sort(hiveSponsorshipComparison)
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
