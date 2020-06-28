import React from "react";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HiveList from "./components/HiveList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: "1em",
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
            Centaurea Apiary
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HiveList />
            </Route>
            <Route path="/:hiveId">Hive</Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
