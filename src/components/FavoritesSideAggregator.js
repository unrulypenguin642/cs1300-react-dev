import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const FavoritesSideAggregator = (props) => {
  const { favoritesList, totalPopulation } = props;
  return (
    <List>
      <ListItem>
        <ListItemText>
          Total population of favorited countries: {totalPopulation} million
        </ListItemText>
      </ListItem>
      {favoritesList.map((item) => (
        <ListItem key={item.name}>
          <ListItemText>{item.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesSideAggregator;
