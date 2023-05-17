import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
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
  align-items: center;
`;
const Tasks = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
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
        }
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
    setTasksFetched(false);
  }, [convertedDate]);

  return (
    <>
      <TaskListContainer>
        <Typography variant="h6">Tasks for {convertedDate}</Typography>
        {tasksFetched &&
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <Tasks>
                <Typography>{task.startTime}</Typography>
                <Typography>{task.task}</Typography>
              </Tasks>
            </React.Fragment>
          ))}
        {!tasksFetched && <Typography>No tasks yet</Typography>}
        <IconButton sx={{ border: "ActiveBorder" }} onClick={handleOpenModal}>
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
