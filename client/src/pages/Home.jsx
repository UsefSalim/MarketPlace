import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "../components/navigation/TopBar";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <nav>Home</nav>
    </>
  );
}
