import React, { useState } from "react";
import { Box, Typography, LinearProgress, Button, Modal } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import GoalDetails from "./GoalDetails";
function ProgressBar(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: "32px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#00F79E", // Progress bar color
            },
            backgroundColor: "#D9D9D9B2",
          }}
        />
      </Box>
      <Box sx={{ width: "43px", height: "30px" }}>
        <Typography variant="title">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const ReachedBox = ({ name, saved, goal, icon, bgColor, date }) => {
  const [open, setOpen] = useState(false);
  const percentage = goal > 0 ? (saved / goal) * 100 : 0;

  const handleDelete = () => {
    console.log({
      Deleted: "true",
    });
  };
  return (
    <>
      {/* Main Box */}
      <Box
        sx={{
          width: "100%",
          minHeight: "176px",
          backgroundColor: "#f2e1e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner Box */}
        <Box
          sx={{
            width: "801px",
            height: "130px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // margin: "23px 129px",
          }}
        >
          {/* Upper Section */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "49.3px",
              }}
            >
              {icon &&
                React.cloneElement(icon, {
                  sx: {
                    width: "49.3px",
                    height: "49.3px",
                    backgroundColor: bgColor,
                    borderRadius: "50%",
                    color: "white",
                  },
                })}
              {/* <HouseIcon
                
              /> */}
              {/* Texts */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  marginLeft: "18.7px",
                }}
              >
                <Typography variant="title">{name}</Typography>
                <Typography variant="text2" sx={{ fontWeight: "300" }}>
                  {date}
                </Typography>
              </Box>
            </Box>
            {/* Right Side */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "218px",
                height: "49.3px",
              }}
            >
              <Box sx={{ marginTop: "20px" }}>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ width: "28px", height: "28px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* Middle Section */}
          <Box
            sx={{
              width: "801px",
              height: "32px",
            }}
          >
            <ProgressBar value={100} />
          </Box>
          {/* Bottom Section */}
          <Box
            sx={{
              width: "801px",
              height: "21px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Tap to see details */}
            <Button
              onClick={() => setOpen(true)}
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                alignSelf: "flex-start",
              }}
            >
              Tap to see details
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <GoalDetails
                  onClose={() => setOpen(false)}
                  saved={saved}
                  goal={goal}
                />
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReachedBox;
