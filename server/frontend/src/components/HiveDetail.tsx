import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { isIOS, isSafari } from "react-device-detect";
import {
  Typography,
  Breadcrumbs,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { useHiveDetailQuery } from "../generated/graphql";
import { upperFirst } from "lodash";
import Link from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";
import ReactPlayer from "react-player";
import RecordIcon from "./RecordIcon";
import HiveAvatar from "./HiveAvatar";
import SponsorshipIcon from "./SponsorshipIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    player: {
      backgroundColor: "#000",
      position: "absolute",
      top: 0,
      left: 0,
    },
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
    },
  })
);

export default function HiveDetail() {
  const classes = useStyles();
  const { hiveSlug } = useParams();

  const [streamError, setStreamError] = useState(false);

  const { loading, error, data } = useHiveDetailQuery({
    variables: {
      hiveSlug,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const hive = data?.hive ?? null;
  const sponsor = hive?.sponsor ?? null;
  const streamUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_APIARY_DEVELOPMENT_STREAM_URL
      : hive?.streamUrl ?? null;

  const sponsorshipLevel = sponsor?.sponsorshipLevel ? (
    <>
      {upperFirst(sponsor.sponsorshipLevel.toLowerCase())}{" "}
      <SponsorshipIcon sponsorshipLevel={sponsor.sponsorshipLevel} />
    </>
  ) : null;

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Apiary
        </Link>
        <Typography color="textPrimary">{hive?.name} Hive</Typography>
      </Breadcrumbs>
      <div style={{ display: "flex", alignItems: "center" }}>
        <HiveAvatar name={hive?.sponsor?.name} logo={hive?.sponsor?.logo} />
        <Typography variant="h2">{hive?.name}</Typography>
      </div>

      {/* Sponsor description */}
      {sponsor ? (
        <div>
          <Typography
            variant="body1"
            style={{ display: "flex", alignItems: "center" }}
          >
            This hive is kindly sponsored{" "}
            {sponsor.sponsorshipLevel ? <>at {sponsorshipLevel} level </> : ""}{" "}
            by {sponsor.name}.{" "}
            {sponsor.url ? (
              <>
                &nbsp;
                <Button
                  color="primary"
                  variant="outlined"
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener"
                >
                  <LinkIcon />
                  &nbsp;Visit {sponsor.name}
                </Button>
              </>
            ) : null}
          </Typography>
        </div>
      ) : null}

      {streamUrl ? (
        <>
          <Typography variant="h4" gutterBottom>
            <RecordIcon /> Live stream
          </Typography>
          {streamError ? (
            <Typography variant="body1">Error loading live stream</Typography>
          ) : (
            <></>
          )}
          {streamUrl && !streamError ? (
            <div className={classes.playerWrapper}>
              {
                isIOS || isSafari ?
                <video controls>
                  <source src={streamUrl} type="application/x-mpegURL" />
                </video>
                : <ReactPlayer
                className={classes.player}
                url={streamUrl}
                light
                width="100%"
                height="100%"
                playing
                volume={1}
                muted={false}
                controls={true}
                config={{
                  file: {
                    forceHLS: true,
                  },
                }}
                onError={() => {
                  setStreamError(true);
                }}
              />
              }
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
