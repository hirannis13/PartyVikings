import React, { useEffect, useState } from "react";
import { IconButton, Typography, Divider } from "@mui/material";
import useModal from "../../hooks/useModal";
import Modal from "../utils/Modal";
import TaskForm from "./TaskForm";
import convertSelectedDay from "../utils/DateConversion";
import { fetchTasksFromFirestore } from "../../service/authService";
import styled from "@emotion/styled";
import Iconify from "../utils/Iconify";

const TaskListContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50vh;
`;
const Tasks = styled("div")`
  display: flex;
  flex-direction: column;
  height: 50vh;
`;

const TaskList = ({ selectedDate }) => {
  const { openModal, updateModalState } = useModal();
  const [tasks, setTasks] = useState({});
  const [tasksFetched, setTasksFetched] = useState(false);
  const handleOpenModal = () => {
    updateModalState(true);
  };
  const selectedDay = selectedDate.toLocaleDateString();
  let convertedDate = convertSelectedDay(selectedDay);

  useEffect(() => {
    fetchTasksFromFirestore(convertedDate)
      .then((fetchedTask) => {
        setTasks(fetchedTask);
        setTasksFetched(true);
        if (fetchedTask.length === 0) {
          setTasksFetched(false);
          console.log("fetchedTask is empty.");
        }
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
    setTasksFetched(false);
  }, [convertedDate]);

  return (
    <>
      <TaskListContainer sx={{ height: "100%" }}>
        <Typography variant="h5" sx={{ margin: "1vh 0 3vh 0" }}>
          Tasks for {convertedDate}
        </Typography>
        {tasksFetched &&
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <Tasks>
                <Typography>{task.startTime}</Typography>
                <Typography>
                  {task.task} <Divider></Divider>
                </Typography>
              </Tasks>
            </React.Fragment>
          ))}
        {!tasksFetched && (
          <Typography variant="b1" sx={{ fontSize: "2vh" }}>
            No tasks yet
          </Typography>
        )}
        <IconButton
          sx={{
            border: "ActiveBorder",
            bottom: "0",
            width: "auto",
          }}
          onClick={handleOpenModal}
        >
          <Iconify icon={"majesticons:plus"}></Iconify>
        </IconButton>
      </TaskListContainer>
      {openModal && (
        <Modal
          title={"Add a To-Do task"}
          content={<TaskForm selectedDay={selectedDay} />}
        />
      )}
    </>
  );
};

export default TaskList;
