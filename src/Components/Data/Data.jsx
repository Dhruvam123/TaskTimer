import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { taskActions } from "../../store/task-actions";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useRef } from "react";

const Data = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Use a ref to store intervals for each task separately
  const timerRefs = useRef({});

  const deleteDataHandler = (id) => {
    dispatch(taskActions.deleteTask(id));
  };

  const editDataHandler = (id) => {
    dispatch(taskActions.editData(id));
  };

  const startTimerHandler = (id) => {
    dispatch(taskActions.setTimerFlag(id));

    // Only start the timer if it's not already running
    if (!timerRefs.current[id]) {
      timerRefs.current[id] = setInterval(() => {
        dispatch(taskActions.startTimer(id)); // Increment timer for this task
      }, 1000);
    }
  };

  const stopTimerHandler = (id) => {
    clearInterval(timerRefs.current[id]); // Clear the timer for this specific task
    delete timerRefs.current[id]; // Remove reference to the cleared interval
    dispatch(taskActions.removeFlag(id)); // Dispatch action to stop the timer flag in state
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "20px",
        padding: "50px",
        flexWrap: "wrap", // Adjust layout to handle more tasks
      }}
    >
      {tasks &&
        tasks.map((item, index) => {
          return (
            <Card
              key={index}
              sx={{ width: "350px", borderRadius: "20px", padding: "20px" }}
              elevation={4}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="error" fontWeight={"bold"} variant="h5">
                    {item.task}
                  </Typography>
                  <Typography
                    color="secondary"
                    fontWeight={"bold"}
                    variant="h5"
                    textAlign={"center"}
                  >
                    {item.timeInSeconds} sec
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EditIcon />}
                  onClick={() => editDataHandler(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteDataHandler(index)}
                >
                  Delete
                </Button>
                {!item.flag ? (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<AccessAlarmsIcon />}
                    onClick={() => startTimerHandler(index)}
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StopCircleIcon />}
                    onClick={() => stopTimerHandler(index)}
                  >
                    Stop
                  </Button>
                )}
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default Data;
