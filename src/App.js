import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import countryData from "./assets/country-data.json";
import CountryCard from "./components/CountryCard";
import SideDrawer from "./components/SideDrawer";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [totalPopulation, setTotalPop] = React.useState(0.0);

  const [displayedCountries, setDisplayedCountries] =
    React.useState(countryData);

  const [favoritesList, setFavoritesList] = React.useState([]);

  const [showFavorites, setShowFavorites] = React.useState(false);

  const [sortByPop, setSortByPop] = React.useState(false);

  const [regionFilters, setRegionFilters] = React.useState({
    Africa: true,
    Americas: true,
    Asia: true,
    Europe: true,
    Oceania: true,
  });

  const [populationFilters, setPopulationFilters] = React.useState({
    "1000,10000000": true,
    "100,1000": true,
    "1,100": true,
    "0,1": true,
  });

  const updateFavorites = React.useCallback(
    (countryCode) => {
      const country = countryData.find((e) => e.countryCode === countryCode);

      if (!country) {
        return;
      }

      if (!favoritesList.includes(country)) {
        setFavoritesList([...favoritesList, country]);
        setTotalPop(totalPopulation + country.population);
      } else {
        const updatedList = favoritesList.filter(
          (e) => e.countryCode !== countryCode
        );
        setFavoritesList(updatedList);
        setTotalPop(totalPopulation - country.population);
      }
    },
    [favoritesList, totalPopulation]
  );

  const handleFilters = React.useCallback(
    (countryList) => {
      let regionFilteredList = [];
      for (const [region, value] of Object.entries(regionFilters)) {
        if (value) {
          const vals = countryList.filter((x) => x.region === region);
          regionFilteredList = [...regionFilteredList, ...vals];
        }
      }

      let updatedList = [];
      for (const [key, value] of Object.entries(populationFilters)) {
        if (value) {
          const [lower, upper] = key.split(",");
          const vals = regionFilteredList.filter(
            (x) =>
              Number(x.population) > Number(lower) &&
              Number(x.population) < Number(upper)
          );
          updatedList = [...updatedList, ...vals];
        }
      }
      return updatedList;
    },
    [regionFilters, populationFilters]
  );

  React.useEffect(() => {
    let display = showFavorites ? [...favoritesList] : [...countryData];

    display = handleFilters(display);

    if (sortByPop) {
      display.sort((a, b) => b.population - a.population);
    }

    setDisplayedCountries(display);
  }, [favoritesList, showFavorites, sortByPop, handleFilters]);

  const displayCards = React.useMemo(() => {
    return (
      <Box p={2} m={2}>
        <Grid container spacing={2}>
          {displayedCountries.map((item, index) => (
            <Box key={index} p={2} m={2}>
              <CountryCard
                name={item.name}
                countryCode={item.countryCode}
                region={item.region}
                population={item.population}
                image={item.image}
                isFavorite={favoritesList.find((e) =>
                  e === item ? true : false
                )}
                updateFavorites={updateFavorites}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    );
  }, [displayedCountries, favoritesList, updateFavorites]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h2">Travel Bucket List</Typography>
        <Grid container spacing={1}>
          <Grid item xs={4} lg={2}>
            <SideDrawer
              setTotalPop={setTotalPop}
              totalPopulation={totalPopulation}
              setFavorites={setFavoritesList}
              favoritesList={favoritesList}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
              sortByPop={sortByPop}
              setSortByPop={setSortByPop}
              regionFilters={regionFilters}
              setRegionFilters={setRegionFilters}
              populationFilters={populationFilters}
              setPopulationFilters={setPopulationFilters}
            />
          </Grid>
          <Grid item xs={8} lg={10}>
            {showFavorites ? (
              <Box p={2} m={2}>
                <div>
                  <Typography variant="p">
                    Total population of favorited countries: {totalPopulation}{" "}
                    million
                  </Typography>
                </div>
              </Box>
            ) : null}
            {displayCards}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
