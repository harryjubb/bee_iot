import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { useHiveDetailQuery } from "../generated/graphql";
import Link from "@material-ui/core/Link";
// import ReactPlayer from "react-player/file";
import ReactPlayer from "react-player";
import RecordIcon from "./RecordIcon";

export default function HiveDetail() {
  const { hiveUrlName } = useParams();
  const { loading, error, data } = useHiveDetailQuery({
    variables: {
      hiveUrlName,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {/* TODO: Breadcrumbs, logo avatar, sponsorship text */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Apiary
        </Link>
        <Typography color="textPrimary">{data?.hive?.name} Hive</Typography>
      </Breadcrumbs>
      <Typography variant="h2" gutterBottom>
        {data?.hive?.name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        <RecordIcon /> Live
      </Typography>
      {
        data?.hive?.streamUrl ? <ReactPlayer url={data.hive.streamUrl} /> : <div>No stream available for this hive.</div>
      }

    </>
  );
}
