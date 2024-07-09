import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { Item } from "../utils";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
import { postRecord } from "../../api/recordsApi";

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Expense = ({ onClose, accounts, budgets }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [acc, setAcc] = useState("");
  const [selectedOption, setSelectedOption] = useState("account");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(getCurrentTimeString());
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");

  const isLargest = useMediaQuery(theme.breakpoints.down("xl"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    const recordData = {
      type: "expense",
      accountId: selectedOption === "account" ? acc : null,
      budgetId: selectedOption === "budget" ? budget : null,
      amount,
      category,
      time,
      date,
      transactor: payee,
      notes,
    };

    try {
      await postRecord(recordData);
      if (
        window.location.pathname === "/records" ||
        window.location.pathname === "/settings/balance-accounts"
      ) {
        window.location.reload();
      }
      onClose();
    } catch (error) {
      console.error("Error posting record:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: isSmallScreen
          ? "16px 26px"
          : isLargest
          ? "16px 68px"
          : "16px 112px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <FormLabel id="demo-radio-buttons-group-label">Fund type:</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <FormControlLabel
            value="account"
            control={<Radio />}
            label="Account"
          />
          <FormControlLabel value="budget" control={<Radio />} label="Budget" />
        </RadioGroup>
      </FormControl>

      {selectedOption === "account" && (
        <TextField
          label="Account"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          select
          value={acc}
          onChange={(event) => setAcc(event.target.value)}
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              <Item
                // icon={account.icon}
                text={account.name}
                // bgColor={account.bgColor}
              />
            </MenuItem>
          ))}
        </TextField>
      )}

      {selectedOption === "budget" && (
        <TextField
          fullWidth
          select
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            sx: {
              height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
            },
          }}
          label="Budget"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          displayEmpty
        >
          {budgets.map((budget) => (
            <MenuItem key={budget._id} value={budget._id}>
              <Item
                // icon={budget.icon}
                text={budget.name}
                // bgColor={budget.bgColor}
              />
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        label="Amount"
        type="number"
        fullWidth
        placeholder="Enter amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        inputProps={{ min: "0" }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Typography
                sx={{ color: "red", fontWeight: "400", fontSize: "24px" }}
              >
                -
              </Typography>
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        type="time"
        fullWidth
        placeholder="Enter time"
        label="Time"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />

      <TextField
        type="date"
        label="Date"
        fullWidth
        placeholder="Enter date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
          inputProps: {
            min: "2022-01-01", // Set min and max dates if needed
            max: "2025-12-31",
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Payee"
        placeholder="Enter payee name"
        fullWidth
        value={payee}
        onChange={(event) => setPayee(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />

      <TextField
        label="Note"
        placeholder="Enter note (optional)"
        multiline
        fullWidth
        maxRows={2}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            height: isSmallScreen ? "40px" : isLargest ? "45px" : undefined,
          },
        }}
      />
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
      >
        <Button
          onClick={handleSubmit}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
          }}
        >
          <Typography variant="body2">Add</Typography>
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
    </Box>
  );
};

export default Expense;
