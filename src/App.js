import { createContext, useState } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Homepage } from "./Homepage";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { ECardetails } from "./Ecardetails";
import { EditEcar } from "./EditEcar";
import { AddEcar } from "./AddEcar";
import { EcarsList } from "./EcarsList";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import CarRentalIcon from "@mui/icons-material/CarRental";

//here Context is created
export const context = createContext(null);

export default function App() {
  const history = useHistory();

  const array = [
    {
      name: "HOME",
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: "EV Cars",
      onClick: "/e-cars",
      icon: <ElectricCarIcon />,
    },
    {
      name: "ADD A EV car",
      onClick: "/e-cars/add",
      icon: <CarRentalIcon />,
    },
  ];

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const [mode, setMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  //api is provided as value in the provider for the whole app
  //usecontext is provided for required components
  //As I have used theme in Material UI all the material UI components are subscribed to theme so no usecontext is needed
  //dark and light theme
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ borderRadius: "0px", minHeight: "100vh" }} elevation={4}>
        <context.Provider value="https://6209f17e92946600171c55d8.mockapi.io">
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                {["left"].map((anchor) => (
                  <Fragment key={anchor}>
                    <Button
                      className="mode"
                      color="inherit"
                      onClick={toggleDrawer(anchor, true)}
                    >
                      <MenuIcon />
                      Menu
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </Fragment>
                ))}
                <Button
                  color="inherit"
                  style={{ marginLeft: "auto" }}
                  startIcon={
                    mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                  }
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                >
                  {mode === "light" ? "dark" : "light"} Mode
                </Button>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/e-cars/add">
                <AddEcar />
              </Route>
              <Route path="/e-cars/edit/:id">
                <EditEcar />
              </Route>
              <Route path="/e-cars/:id">
                <ECardetails />
              </Route>
              <Route path="/e-cars">
                <EcarsList />
              </Route>
              <Route path="**">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </context.Provider>
      </Paper>
    </ThemeProvider>
  );
}
