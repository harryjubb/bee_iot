import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const hiveStyles = makeStyles((theme: Theme) =>
    createStyles({
        nonSponsor: {
            color: "inherit"
        },
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
            objectFit: "contain",
        },
        logoAvatarImg: {
            objectFit: "contain!important" as "contain"
        },
    })
);