import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { useHiveDetailQuery } from "../generated/graphql";
import Link from "@material-ui/core/Link";
// import ReactPlayer from "react-player/file";
import ReactPlayer from "react-player";

export default function HiveDetail() {
  const { hiveUrlName } = useParams();
  const { loading, error, data } = useHiveDetailQuery({
    variables: {
      hiveUrlName: hiveUrlName,
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
      <ReactPlayer url={`/hls/${data?.hive?.streamKey ?? "notfound"}.m3u8`} />
    </>
  );
}
