import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@keyframes blinker': {
            '0%': {
                opacity: 1
            },
            '100%': {
                opacity: 0
            }
        },
        recordIcon: {
            color: 'red',
            animation: '$blinker 1.5s cubic-bezier(.5, 0, 1, 1) infinite alternate',
        },
    })
);


export default function RecordIcon() {
    const classes = useStyles()

    return (
        <FiberManualRecordIcon className={classes.recordIcon} />
    )
}
