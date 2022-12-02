import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CardHeader from "@mui/material/CardHeader";

const CountryCard = (props) => {
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        action={
          <IconButton onClick={() => props.updateFavorites(props.countryCode)}>
            {props.isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        }
        title={<Typography variant="h4">{props.name}</Typography>}
      />
      <CardMedia
        component="img"
        image={props.image}
        alt={props.name}
        sx={{ height: 250 }}
      />
      <CardContent>
        <Typography variant="h5">{props.region}</Typography>
        <Typography variant="h6">
          Population: {props.population} mil.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
