import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CreateList, ListBox } from "../../components/to buy list";
import { tokens } from "../../theme";
import { BackBtn, SpeedDial } from "../../components/utils";

const ToBuyList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const lists = [
    {
      name: "Grocery List",
      description: "Essential items for the week's meals",
    },
    {
      name: "Shopping List",
      description: "Items needed for household supplies",
    },
    {
      name: "Birthday Party Supplies",
      description: "Decorations and party essentials",
    },
    {
      name: "Travel Packing List",
      description: "Items to pack for an upcoming trip",
    },
    {
      name: "School Supplies",
      description: "Books, stationery, and accessories",
    },
    {
      name: "Home Improvement List",
      description: "Tools and materials for DIY projects",
    },
    {
      name: "Fitness Equipment",
      description: "Gear for home workouts",
    },
    {
      name: "Tech Gadgets List",
      description: "Latest gadgets and accessories",
    },
    {
      name: "Christmas Shopping List",
      description: "Gifts and decorations for the holiday season",
    },
  ];

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    // Container
    <Box
      sx={{
        width: "100%",
        height: "90%",
        gap: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Back button  */}
      <BackBtn />

      {/* Title  */}
      <Typography
        variant={"h4"}
        gutterBottom
        sx={{
          borderBottom: `3px solid ${colors.purple[600]}`,
          mt: isSmallScreen ? 10 : undefined,
        }}
      >
        Your Lists
      </Typography>

      {/* Contents */}
      <Box
        sx={{
          width: isMediumScreen ? "90%" : isLargeScreen ? "100%" : "56%",
          height: "781px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "auto",
          gap: "14px",
        }}
      >
        {/* ListBox components */}
        {lists.map((list, index) => (
          <ListBox
            key={index}
            name={list.name}
            description={list.description}
          />
        ))}
      </Box>

      {/* Speed Dial  */}
      <SpeedDial modal={<CreateList />} />
    </Box>
  );
};

export default ToBuyList;
