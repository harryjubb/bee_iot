import React from "react"
import { hiveStyles } from "./HiveStyles";
import { HiveType } from "../generated/graphql";
import { Avatar } from "@material-ui/core";


export default function HiveAvatar(hive: HiveType) {
    const classes = hiveStyles();

    return <Avatar
        className={classes.logoAvatar}
        classes={{ img: classes.logoAvatarImg }}
        alt={hive.sponsor?.name ?? '🐝'}
        src={hive.sponsor?.logo ?? ''}
    />
}