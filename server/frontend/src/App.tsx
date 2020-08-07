import React from "react";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Typography,
  Toolbar,
  Link,
  Button,
} from "@material-ui/core";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HiveList from "./components/HiveList";
import HiveDetail from "./components/HiveDetail";
import SponsorshipIcon from "./components/SponsorshipIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(1),
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link color="inherit" href="/">
              Centaurea Apiary
            </Link>
          </Typography>
          <Link
            href={process.env.REACT_APP_APIARY_SPONSORSHIP_URL}
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <Button
              color="inherit"
              variant="outlined"
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SponsorshipIcon />&nbsp;Sponsor a hive
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HiveList />
            </Route>
            <Route path="/hive/:hiveSlug" children={<HiveDetail />} />
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
