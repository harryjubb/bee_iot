import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
  createStyles,
  makeStyles,
  Theme,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useHiveListQuery } from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bronze: {
      color: "#cd7f32",
    },
    silver: {
      color: "#999999",
    },
    gold: {
      color: "#ccac00",
    },
    platinum: {
      color: "#697998",
    },
    hiveListItem: {
      display: "flex",
    },
    hiveName: {
      flexGrow: 1,
    },
    logoAvatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: theme.spacing(2),
    },
    logoAvatarImg: {
      objectFit: "contain",
    },
  })
);

const hiveSponsorshipLevelOrdering = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];

const hiveSortComparison = (hiveA: any, hiveB: any) =>
  hiveSponsorshipLevelOrdering.indexOf(
    hiveA.sponsor?.sponsorshipLevel ?? null
  ) <=
  hiveSponsorshipLevelOrdering.indexOf(hiveB.sponsor?.sponsorshipLevel ?? null)
    ? 1
    : -1;

export default function HiveList() {
  const classes = useStyles();

  const { loading, error, data } = useHiveListQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Typography variant="h2">Hives</Typography>
      <List>
        {(data?.allHives ?? [])
          .sort(hiveSortComparison)
          .map((hive: any, index: number) => (
            <React.Fragment key={hive.id}>
              <ListItem className={classes.hiveListItem}>
                <ListItemAvatar>
                  <Avatar
                    className={classes.logoAvatar}
                    classes={{ img: classes.logoAvatarImg }}
                    alt={hive.sponsor?.name ?? "🐝"}
                    src={hive.sponsor?.logo}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.hiveName}
                  disableTypography
                  primary={<Typography variant="body1">{hive.name}</Typography>}
                  secondary={
                    hive.sponsor?.sponsorshipLevel ? (
                      <Typography
                        variant="overline"
                        className={
                          // @ts-ignore
                          classes[hive.sponsor?.sponsorshipLevel?.toLowerCase()]
                        }
                      >
                        {hive.sponsor?.sponsorshipLevel} Sponsor
                      </Typography>
                    ) : null
                  }
                />
                <Button
                  component={RouterLink}
                  to={`/hive/${hive.urlName}`}
                  variant="contained"
                  color="default"
                  size="small"
                >
                  View
                </Button>
              </ListItem>

              {index !== data?.allHives?.length - 1 ? (
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
