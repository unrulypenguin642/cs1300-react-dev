import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import StarIcon from "@mui/icons-material/Star";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/Sort";
import Switch from "@mui/material/Switch";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import FavoritesSideAggregator from "./FavoritesSideAggregator";

const drawerWidth = 250;

const SideDrawer = (props) => {
  const [openRegionFilter, setOpenRegionFilter] = React.useState(true);
  const [openPopulationFilter, setOpenPopulationFilter] = React.useState(true);

  const {
    totalPopulation,
    sortByPop,
    setRegionFilters,
    showFavorites,
    setShowFavorites,
    setFavorites,
    setTotalPop,
    setSortByPop,
    regionFilters,
    populationFilters,
    setPopulationFilters,
    favoritesList,
  } = props;

  const handleRegionClick = React.useCallback(() => {
    setOpenRegionFilter(!openRegionFilter);
  }, [openRegionFilter]);

  const handlePopulationClick = React.useCallback(() => {
    setOpenPopulationFilter(!openPopulationFilter);
  }, [openPopulationFilter]);

  const handleFavorites = React.useCallback(
    (e) => {
      if (!e || !e.target.checked) {
        setShowFavorites(false);
      } else {
        setShowFavorites(true);
      }
    },
    [setShowFavorites]
  );

  const handleResetFilters = React.useCallback(() => {
    setRegionFilters({
      Africa: true,
      Americas: true,
      Asia: true,
      Europe: true,
      Oceania: true,
    });
    setPopulationFilters({
      "1000,10000000": true,
      "100,1000": true,
      "1,100": true,
      "0,1": true,
    });
  }, [setRegionFilters, setPopulationFilters]);

  const handleReset = React.useCallback(() => {
    setFavorites([]);
    setTotalPop(0.0);
    handleFavorites();
    setSortByPop(false);
    handleResetFilters();
  }, [
    setFavorites,
    setTotalPop,
    setSortByPop,
    handleFavorites,
    handleResetFilters,
  ]);

  const sortByPopulation = React.useCallback(() => {
    if (!sortByPop) {
      setSortByPop(true);
    } else {
      setSortByPop(false);
    }
  }, [setSortByPop, sortByPop]);

  const filterByRegion = React.useCallback(
    (e) => {
      const updatedFilters = { ...regionFilters };
      const checkboxValue = e.target.value;
      if (e.target.checked) {
        if (checkboxValue === "Africa") {
          updatedFilters.Africa = true;
        } else if (checkboxValue === "Americas") {
          updatedFilters.Americas = true;
        } else if (checkboxValue === "Asia") {
          updatedFilters.Asia = true;
        } else if (checkboxValue === "Europe") {
          updatedFilters.Europe = true;
        } else if (checkboxValue === "Oceania") {
          updatedFilters.Oceania = true;
        }
      } else {
        if (checkboxValue === "Africa") {
          updatedFilters.Africa = false;
        } else if (checkboxValue === "Americas") {
          updatedFilters.Americas = false;
        } else if (checkboxValue === "Asia") {
          updatedFilters.Asia = false;
        } else if (checkboxValue === "Europe") {
          updatedFilters.Europe = false;
        } else if (checkboxValue === "Oceania") {
          updatedFilters.Oceania = false;
        }
      }
      setRegionFilters(updatedFilters);
    },
    [setRegionFilters, regionFilters]
  );

  const filterByPopulation = React.useCallback(
    (e) => {
      const updatedFilters = { ...populationFilters };
      const checkboxValue = e.target.value;
      if (e.target.checked) {
        if (checkboxValue === "1000,10000000") {
          updatedFilters["1000,10000000"] = true;
        } else if (checkboxValue === "100,1000") {
          updatedFilters["100,1000"] = true;
        } else if (checkboxValue === "1,100") {
          updatedFilters["1,100"] = true;
        } else if (checkboxValue === "0,1") {
          updatedFilters["0,1"] = true;
        }
      } else {
        if (checkboxValue === "1000,10000000") {
          updatedFilters["1000,10000000"] = false;
        } else if (checkboxValue === "100,1000") {
          updatedFilters["100,1000"] = false;
        } else if (checkboxValue === "1,100") {
          updatedFilters["1,100"] = false;
        } else if (checkboxValue === "0,1") {
          updatedFilters["0,1"] = false;
        }
      }
      setPopulationFilters(updatedFilters);
    },
    [setPopulationFilters, populationFilters]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={"reset"} disablePadding>
            <ListItemButton onClick={handleReset}>
              <ListItemIcon>
                <RestartAltIcon />
              </ListItemIcon>
              <ListItemText primary="Reset" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"resetFilters"} disablePadding>
            <ListItemButton onClick={handleResetFilters}>
              <ListItemIcon>
                <FilterAltOffIcon />
              </ListItemIcon>
              <ListItemText primary="Reset Filters" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={handleRegionClick}>
            <ListItemIcon>
              <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Filter By Region" />
            {openRegionFilter ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openRegionFilter} timeout="auto" unmountOnExit>
            <FormControl>
              <FormGroup aria-labelledby="checkbox-region-filter">
                <FormControlLabel
                  value="Africa"
                  control={<Checkbox />}
                  label="Africa"
                  onChange={filterByRegion}
                  checked={regionFilters.Africa ?? true}
                />
                <FormControlLabel
                  value="Americas"
                  control={<Checkbox />}
                  label="Americas"
                  onChange={filterByRegion}
                  checked={regionFilters.Americas ?? true}
                />
                <FormControlLabel
                  value="Asia"
                  control={<Checkbox />}
                  label="Asia"
                  onChange={filterByRegion}
                  checked={regionFilters.Asia ?? true}
                />
                <FormControlLabel
                  value="Europe"
                  control={<Checkbox />}
                  label="Europe"
                  onChange={filterByRegion}
                  checked={regionFilters.Europe ?? true}
                />
                <FormControlLabel
                  value="Oceania"
                  control={<Checkbox />}
                  label="Oceania"
                  onChange={filterByRegion}
                  checked={regionFilters.Oceania ?? true}
                />
              </FormGroup>
            </FormControl>
          </Collapse>
        </List>
        <List>
          <ListItemButton onClick={handlePopulationClick}>
            <ListItemIcon>
              <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="Filter By Population (in Millions)" />
            {openPopulationFilter ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openPopulationFilter} timeout="auto" unmountOnExit>
            <FormControl>
              <FormGroup aria-labelledby="checkbox-region-filter">
                <FormControlLabel
                  value="1000,10000000"
                  control={<Checkbox />}
                  label="> 1,000"
                  onChange={filterByPopulation}
                  checked={populationFilters["1000,10000000"]}
                />
                <FormControlLabel
                  value="100,1000"
                  control={<Checkbox />}
                  label="100 - 1,000"
                  onChange={filterByPopulation}
                  checked={populationFilters["100,1000"]}
                />
                <FormControlLabel
                  value="1,100"
                  control={<Checkbox />}
                  label="1 - 100"
                  onChange={filterByPopulation}
                  checked={populationFilters["1,100"]}
                />
                <FormControlLabel
                  value="0,1"
                  control={<Checkbox />}
                  label="< 1.0"
                  onChange={filterByPopulation}
                  checked={populationFilters["0,1"]}
                />
              </FormGroup>
            </FormControl>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem key={"population"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText primary="Sort by Population" />
              <Switch onChange={sortByPopulation} checked={sortByPop} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"favorites"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
              <Switch onChange={handleFavorites} checked={showFavorites} />
            </ListItemButton>
          </ListItem>
        </List>
        <FavoritesSideAggregator
          favoritesList={favoritesList}
          totalPopulation={totalPopulation}
        />
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
