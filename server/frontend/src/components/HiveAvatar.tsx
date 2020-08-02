import React from "react"
import { hiveStyles } from "./HiveStyles";
import { HiveType } from "../generated/graphql";
import { Avatar } from "@material-ui/core";

type HiveAvatarProps = {
    hive: RecursivePartial<HiveType> | null | undefined
}

export default function HiveAvatar(props: HiveAvatarProps) {
    const classes = hiveStyles();

    return <Avatar
        className={classes.logoAvatar}
        classes={{ img: classes.logoAvatarImg }}
        alt={props.hive?.sponsor?.name ?? '🐝'}
        src={props.hive?.sponsor?.logo ?? ''}
    />
}