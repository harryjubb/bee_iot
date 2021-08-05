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

import {
  Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";

import { createBrowserHistory } from 'history';


import ReactGA from 'react-ga';
import CookieConsent, { Cookies } from "react-cookie-consent";

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

const history = createBrowserHistory();

const activateAnalytics = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    history.listen((location) => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    });
  }
}

if ( Cookies.get('CookieConsent') === 'true' || Cookies.get('CookieConsent-legacy') === 'true') {
  activateAnalytics()
}

function App() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <CookieConsent
      buttonText="That's ok with me"
      enableDeclineButton
      declineButtonText="No thank you"
      onAccept={() => { activateAnalytics() }}
      >
        <Typography variant="body1">
        This website uses cookies to help us understand your interest in the bees <span role="img" aria-label="bee">🐝</span>
        </Typography>
      </CookieConsent>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link color="inherit" component={RouterLink} to="/">
              {process.env.REACT_APP_APIARY_NAME ?? "Apiary"}
            </Link>
          </Typography>
          { process.env.REACT_APP_APIARY_SPONSORSHIP_URL ?
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <SponsorshipIcon />
              &nbsp;Sponsor a hive
            </Button>
          </Link>
          : <></>
          }
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/">
            <HiveList />
          </Route>
          <Route path="/hive/:hiveSlug" children={<HiveDetail />} />
          <Route>
            <Typography variant="h2" gutterBottom>
              Page not found
            </Typography>
            <Typography variant="body1">
              There doesn't seem to bee anything here <span role="img" aria-label="bee">🐝</span>
            </Typography>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
