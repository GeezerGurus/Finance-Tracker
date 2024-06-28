import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, useTheme, Paper, Grid } from "@mui/material";

import { tokens } from "../../theme";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIos as ArrowBackIosIcon } from "@mui/icons-material";
import { BookContents } from "../../components/utils";

const favorite = [
  {
    title: "The bottle Budget",
    author: "Joel Woods",
    image: "",
    favorite: true,
  },
  {
    title: "Project Over School Work",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  { title: "Restless Nights", author: "Thuta Htun", image: "", favorite: true },
  {
    title: "Darkness When Light",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
  {
    title: "Darkness When Light",
    author: "Thuta Htun",
    image: "",
    favorite: true,
  },
];

const path = "/books";
const Collection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const gridRef = useRef(null);
  const { collection } = useParams();

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const hasOverflow =
          gridRef.current.scrollHeight > gridRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    // Main Container
    <Paper
      sx={{
        width: "100%",
        height: "940px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "1290px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mt: 2,
        }}
      >
        {/* Title */}
        <Typography variant="h3">
          {collection
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>
        {/* Call Back Button */}
        <Button
          component={Link}
          to={path}
          startIcon={
            <ArrowBackIosIcon sx={{ width: "20px", height: "20px" }} />
          }
          sx={{
            height: "34px",
            mr: 2,
            position: "absolute",
            top: "20%",
            left: 0,
          }}
        >
          <Typography variant="body1">Back</Typography>
        </Button>
      </Box>
      {/* Contents */}
      <Grid
        container
        ref={gridRef}
        sx={{
          width: isOverflowing ? "1151px" : "1146px",
          height: "769px",
          gap: "49px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: 1,
          overflowY: "auto",
        }}
      >
        {/* <Grid container> */}
        {favorite.map((item, index) => (
          <Grid item>
            <BookContents
              key={index}
              title={item.title}
              author={item.author}
              favorite={item.favorite}
              pathImage={item.image}
            />
          </Grid>
        ))}

        {/* </Grid> */}
      </Grid>
    </Paper>
  );
};

export default Collection;
