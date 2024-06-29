import React from "react";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { tokens } from "../../../theme";

export const DropDownItems = ({ content, Navigation, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {content.map(({ text, path }) => (
        <ListItem
          key={text}
          disablePadding
          sx={{
            width: "190px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
          }}
        >
          <ListItemButton
            onClick={() => {
              Navigation(path);
              onClick();
            }}
            sx={{
              height: "40px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <FiberManualRecordIcon
                sx={{
                  width: "11px",
                  height: "11px",
                  color: "#8884DC",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
};

export default DropDownItems;
