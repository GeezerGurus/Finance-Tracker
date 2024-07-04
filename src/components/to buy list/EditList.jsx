import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Typography,
  Button,
  useTheme,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";

const EditList = ({ onClose, name, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listName, setListName] = useState(name || "");
  const [listDescription, setListDescription] = useState(description || "");

  const handleSave = () => {
    console.log({
      name: listName,
      description: listDescription,
    });
  };

  const handleDelete = () => {
    console.log("List deleted");
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // Container
    <Paper
      sx={{
        padding: isSmallScreen ? "16px 26px" : "32px 116px",
        width: isSmallScreen ? "359px" : "710px",
        height: isSmallScreen ? "416px" : "426px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Edit List
      </Typography>

      {/* Form  */}
      <TextField
        placeholder="Enter name"
        label="Name"
        fullWidth
        value={listName || ""}
        onChange={(e) => setListName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "42px" : undefined },
        }}
      />
      <TextField
        placeholder="Enter a description (optional)"
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        value={listDescription || ""}
        onChange={(e) => setListDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Buttons  */}
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleSave}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            textTransform: "none",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditList;
