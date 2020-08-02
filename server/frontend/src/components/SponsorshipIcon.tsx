import React from 'react'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import { hiveStyles, sponsorshipMap } from './HiveStyles'
import { OrganisationSponsorshipLevel } from '../generated/graphql'

type SponsorshipIconProps = {
    sponsorshipLevel: undefined | null | OrganisationSponsorshipLevel
}

export default function SponsorshipIcon(props: SponsorshipIconProps) {
    const classes = hiveStyles()

    const sponsorshipLevelClassName = props.sponsorshipLevel ? sponsorshipMap[props.sponsorshipLevel] : 'nonSponsor'
    const sponsorshipLevelClass = classes[sponsorshipLevelClassName]

    return (
        <EmojiEventsIcon className={sponsorshipLevelClass} />
    )
} 
