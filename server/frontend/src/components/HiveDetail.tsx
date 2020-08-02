import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Breadcrumbs, Button, Avatar, Box } from "@material-ui/core";
import { useHiveDetailQuery } from "../generated/graphql";
import { upperFirst } from 'lodash'
import Link from "@material-ui/core/Link";
import LinkIcon from '@material-ui/icons/Link';
// import ReactPlayer from "react-player/file";
import ReactPlayer from "react-player";
import RecordIcon from "./RecordIcon";
import { hiveStyles } from "./HiveStyles";
import HiveAvatar from "./HiveAvatar";
import SponsorshipIcon from "./SponsorshipIcon";


export default function HiveDetail() {
  const classes = hiveStyles();

  const { hiveSlug } = useParams();

  const [streamLoading, setStreamLoading] = useState(true)
  const [streamError, setStreamError] = useState(false)

  const { loading, error, data } = useHiveDetailQuery({
    variables: {
      hiveSlug,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const hive = data?.hive ?? null
  const sponsor = hive?.sponsor ?? null

  return (
    <>
      {/* TODO: Breadcrumbs, logo avatar, sponsorship text */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Apiary
        </Link>
        <Typography color="textPrimary">{hive?.name} Hive</Typography>
      </Breadcrumbs>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HiveAvatar name={hive?.sponsor?.name} logo={hive?.sponsor?.logo} />
        <Typography variant="h2">
          {hive?.name}
        </Typography>

        {
          sponsor ? <div>
            <SponsorshipIcon sponsorshipLevel={sponsor.sponsorshipLevel} />
          </div> : <></>
        }

      </div>

      {/* Sponsor link */}
      {
        sponsor ? <div>
          <Typography variant="body1">This hive is kindly sponsored{sponsor.sponsorshipLevel ? ` at ${upperFirst(sponsor.sponsorshipLevel.toLowerCase())} level` : ''} by {sponsor.name}. {
            sponsor.url ?
              <Button color="primary" variant="outlined" href={sponsor.url} target="_blank" rel="noopener">
                <LinkIcon />&nbsp;Visit sponsor
              </Button>
              : null
          }
          </Typography>
        </div>
          : null
      }

      {
        hive?.streamUrl ? <>
          <Typography variant="h4" gutterBottom>
            <RecordIcon /> Live stream
        </Typography>
          {
            streamLoading ? <Typography variant="body1">Stream loading</Typography> : <></>
          }
          {
            streamError ? <Typography variant="body1">Error loading live stream</Typography> : <></>
          }
          {
            hive?.streamUrl && !streamError ? <ReactPlayer
              url={hive.streamUrl}
              playing={false}
              volume={1}
              muted={false}
              controls={true}
              config={{
                file: {
                  forceHLS: true
                }
              }}
              onReady={() => { setStreamLoading(false) }}
              onError={() => {
                setStreamLoading(false)
                setStreamError(true)
              }}
            /> : <></>
          }</>
          : <></>
      }
    </>
  );
}
