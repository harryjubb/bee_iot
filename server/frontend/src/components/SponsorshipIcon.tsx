import React from 'react'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import { hiveStyles } from './HiveStyles'
import { SponsorshipLevel, sponsorshipLevelClassName } from './sponsorship'

type SponsorshipIconProps = {
    sponsorshipLevel?: SponsorshipLevel
}


export default function SponsorshipIcon(props: SponsorshipIconProps) {
    const classes = hiveStyles()

    const sponsorshipLevelClass = classes[sponsorshipLevelClassName(props.sponsorshipLevel)]

    return (
        <EmojiEventsIcon className={sponsorshipLevelClass} />
    )
} 
