import React from "react"
import { hiveStyles } from "./HiveStyles";
import { Avatar } from "@material-ui/core";

interface HiveAvatarProps {
    name?: string | null;
    logo?: string | null;
}

export default function HiveAvatar(props: HiveAvatarProps) {
    const classes = hiveStyles();

    return <Avatar
        className={classes.logoAvatar}
        classes={{ img: classes.logoAvatarImg }}
        alt={props.name ?? '🐝'}
        src={props.logo ?? ''}
    />
}