# Development

### Link to Deployed Website

https://unrulypenguin642.github.io/cs1300-development/

### Goal and Value of the Application

This application allows users to create a travel bucket list. Users can filter and sort based on region and population to find their ideal vacation destinations. They can also favorite countries to add them to their bucket list and see the total population of all the countries, which is a cool interesting fact!

### Usability Principles Considered

The layout is a fairly simple grid with cards for each country. Like many other travel apps, I have a sidebar which allows you to filter and sort based on specific categories, which makes the app more learnable to users. The cards are fairly minimalistic but have large pictures of the destinations to make them attractive to users.

### Organization of Components

I have 3 main components outside of App.js: CountryCard, FavoritesSideAggregator, and SideDrawer. Below are brief descriptions of each of my components:

- **App**: This is the main page of the website which houses all of the components. It contains the SideDrawer and grid layout which houses the CountryCard components and contains the following states:
  - `totalPopulation` - the total population of all favorited countries
  - `displayedCountries` - the list of countryData that will be displayed on the page
  - `favoritesList` - a list containing the data for all favorited countries
  - `showFavorites` - a boolean representing whether to filter for favorites (show only favorites on the page)
  - `sortByPop` - a boolean representing whether to sort the countries by population
  - `regionFilters` - a dictionary mapping a region filter checkbox to a boolean representing whether the filter is on for the region
  - `populationFilters` - a dictionary mapping a population range filter checkbox to a boolean representing whether the filter is on for the population range.
- **CountryCard**: This is the component which creates each country item to be displayed on the page. It is used in App.js and contains no states.
- **FavoritesSideAggregator**: This component shows favorited countries and their total population in the SideDrawer on the left side of the page. It is used in the SideDrawer component as the aggregator of favorited countries and contains no states.
- **SideDrawer**: This is the component which contains the toggles for the filtering and sorting functions of the app. It also contains the FavoritesSideAggregator component which shows the aggregated data. It contains the following states:
  - `openRegionFilter` - a boolean indicating whether the regionFilter dropdown is open
  - `openPopulationFilter` - a boolean indicating whether the populationFilter dropdown is open

### How Data is Passed Down Through Components

- **CountryCard**: The data for each CountryCard item is passed from a JSON file via App to the CountryCards. The CountryCards contain the following props which are passed from App.js:

  - `name` - the name of the country for the CountryCard
  - `countryCode` - the countryCode of the country. This is used as a key for favoriting countries. (this isn't super necessary, I just had it in my dataset)
  - `region` - the region of the world that the country corresponding to the CountryCard is in
  - population: the total population of the country according to Google
  - `image` - an image for the CountryCard
  - `isFavorite` - a boolean that represents whether or not the CountryCard has been favorited
  - `updateFavorites` - a function that updates the favorites list by adding the current item to the favorites list

- **SideDrawer**: Various props are passed from App to the SideDrawer in order to enable the filtering, sorting, resetting, and aggregation functions

  - `setTotalPop` - a function that sets the total population of the favorited countries
  - `totalPopulation` - an integer representing the total population of the favorite countries, set by setTotalPop
  - `setFavorites` - a function that updates the Favorites list
  - `favoritesList` - a list containing data for favorited countries
  - `showFavorites` - a boolean representing whether or not only the favorites should be shown on the page
  - `setShowFavorites` - a function which sets the showFavorites property
  - `sortByPop` - a boolean representing whether or not to sort the CountryCards based on the country population (most populous -> least populous)
  - `setSortByPop` - a function which updates the sortByPop property
  - `regionFilters` - a dictionary mapping each region name to a boolean indicating whether to filter by that region
  - `setRegionFilters` - a function which updates the regionFilters dictionary in App
  - `populationFilters` - a dictionary mapping each population range to a boolean indicating whether to filter by that range.
  - `setPopulationFilters` - a function which updates the populationFIlters dictionary in App

- **FavoritesSideAggregator**: The SideDrawer passes data to the aggregator component using the following props:
  - `favoritesList` - a list of the favorited countries
  - `totalPopulation` - the total population of the favorited countries

### How the User Triggers State Changes

Below I describe how the user triggers state changes in the App and SideDrawer components:

- **App**
  - `totalPopulation` & `favoritesList`: When the user "favorites" a country by clicking the star icon in the top right corner of the CountryCard, it triggers the "updateFavorites" function which adds the country data to the favoritesList and adds its population to the current totalPopulation. The opposite effect occurs when
  - `showFavorites`: When the user toggles the "Favorites" toggle, this updates the showFavorites state. The useEffect watches the state of showFavorites and updates the displayedCountries when the state changes in order to toggle between the favoritesList and all countries list.
  - `sortByPop`: When the user toggles the "Sort by Population" toggle, this updates the "sortByPop" state. The useEffect watches the state of sortByPop and updates the displayedCountries state when the sortByPop state changes to contain the list of countries sorted by population.
  - `regionFilters`: When the user toggles the checkboxes under the "Sort by Region" category, this triggers update of the regionFilters state to match the states of the checkboxes. This is used in the useEffect for filtering of the displayed countries.
  - `populationFilters`: When the user toggles the checkboxes under the "Sort by Population (in Millions)" category, this triggers update of the populationFilters state to match the states of the checkboxes. This is used in the useEffect for filtering of the displayed countries.
  - `displayedCountries`: The displayedCountries state is updated in the useEffect function by watching the states of the favoritesList, showFavorites, and sortByPop states as well as the handleFilters function which uses a callback and watches the regionFilters and populationFilters states. The displayedCountries state thus automatically updates when the user triggers updates of the various other states.
- **SideDrawer**:
  - `openRegionFilter`: When the user presses the "Filter By Region" button, it triggers the "handleRegionClick" function which updates the openRegionFilter state to open and close the filter dropdown.
  - `openPopulationFilter`: When the user presses the "Filter By Population (in Millions)" button, it triggers the handlePopulationClick function which updates the openPopulationFilter state to open and close the filter dropdown.
  - When the user presses the "Reset Filters" button, the filters are reset to their original state.
  - When the user presses the "Reset" button, all filters, sorting, and favorites are reset to their original state. In other words, all filters are selected, there is no sorting, and all countries are unfavorited.
- The CountryCard and FavoritesSideAggregator components are stateless.
