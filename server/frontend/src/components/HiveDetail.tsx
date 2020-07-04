import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { useHiveDetailQuery } from "../generated/graphql";

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
      <Typography variant="h2" gutterBottom>
        {data?.hive?.name}
      </Typography>
    </>
  );
}
