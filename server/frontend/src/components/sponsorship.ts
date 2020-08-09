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

export type SponsorshipLevel = undefined | null | OrganisationSponsorshipLevel

export const sponsorshipLevelClassName = (sponsorshipLevel: SponsorshipLevel) => sponsorshipLevel ? sponsorshipMap[sponsorshipLevel] : 'nonSponsor'

export const hiveSponsorshipLevelOrdering = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];