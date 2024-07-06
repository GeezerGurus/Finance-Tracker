import {
  Paper,
  Typography,
  Button,
  useTheme,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { patchItemToBuy } from "../../api/itemsToBuy";
import { enqueueSnackbar } from "notistack";

const EditItem = ({ onClose, name, description, listId, itemId, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [itemName, setItemName] = useState(name || "");
  const [itemDescription, setItemDescription] = useState(description || "");

  const handleSave = async () => {
    await patchItemToBuy(listId, itemId, {
      name: itemName,
      description: itemDescription,
    });
    refresh();
    enqueueSnackbar("Saved!", { variant: "info" });
    onClose();
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        Edit Item
      </Typography>

      {/* Form  */}
      <TextField
        fullWidth
        label="Name"
        placeholder="What is it?"
        value={itemName || ""}
        onChange={(e) => setItemName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: isSmallScreen ? "42px" : undefined },
        }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        maxRows={2}
        placeholder="Enter a description (optional)"
        value={itemDescription || ""}
        onChange={(e) => setItemDescription(e.target.value)}
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

export default EditItem;
