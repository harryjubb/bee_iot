import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { OrganisationSponsorshipLevel } from "../generated/graphql";

interface SponsorshipMap {
    [OrganisationSponsorshipLevel.Bronze]: 'bronze';
    [OrganisationSponsorshipLevel.Silver]: 'silver';
    [OrganisationSponsorshipLevel.Gold]: 'gold';
    [OrganisationSponsorshipLevel.Platinum]: 'platinum';
}

export const sponsorshipMap: SponsorshipMap = {
    [OrganisationSponsorshipLevel.Bronze]: 'bronze',
    [OrganisationSponsorshipLevel.Silver]: 'silver',
    [OrganisationSponsorshipLevel.Gold]: 'gold',
    [OrganisationSponsorshipLevel.Platinum]: 'platinum',
}

export const hiveStyles = makeStyles((theme: Theme) =>
    createStyles({
        nonSponsor: {
            color: "#000"
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
        },
        logoAvatarImg: {
            objectFit: "contain",
        },
    })
);