import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/task-actions";
import { default as swal } from "sweetalert2";

const Form = () => {
  const isEdit = useSelector((state) => state.isEdit);
  const dispatch = useDispatch();
  const taskName = useSelector((state) => state.taskName);
  const timeInSeconds = useSelector((state) => state.timeInSeconds);
  const timerFlag = useSelector((state) => state.flag);
  const addDataHandler = () => {
    const taskData = {
      task: taskName,
      timeInSeconds: timeInSeconds,
      timerFlag: timerFlag,
    };
    if (taskName == "") {
      swal.fire("Oops...", "please Enter Valid TaskName!", "error");
    } else {
      dispatch(taskActions.addTask(taskData));
      dispatch(taskActions.setTaskName(""));
    }
  };
  const editData = () => {
    dispatch(taskActions.updateData(taskName));
    dispatch(taskActions.setTaskName(""));
  };

  return (
    <Box
      sx={{
        padding: "30px",
        width: "500px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <TextField
        label="Task"
        color="primary"
        size="small"
        sx={{ marginRight: "10px" }}
        value={taskName}
        autoComplete="off"
        onChange={(e) => {
          dispatch(taskActions.setTaskName(e.target.value));
        }}
      />
      {isEdit ? (
        <Button variant="contained" onClick={editData}>
          Update
        </Button>
      ) : (
        <Button variant="contained" onClick={addDataHandler}>
          Add
        </Button>
      )}
    </Box>
  );
};
export default Form;
