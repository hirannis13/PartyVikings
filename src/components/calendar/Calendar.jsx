import { useState } from "react";
import styled from "@emotion/styled";
import { IconButton, Typography, Card } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";
import TaskList from "./TaskList";

const CalendarControlContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TaskListContainer = styled(Card)`
  width: 20vw;
  border-radius: 20px;
  height: 35vh;
  display: flex;
  justify-content: center;
`;

const MonthYear = styled(Typography)`
  margin: 8px;
`;

const CalendarWithTasksContainer = styled("div")`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const CalendarContainer = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 65%;
  padding: 2rem;
  border-radius: 20px;
`;

const ArrowIconLeft = styled(ChevronLeft)`
  font-size: 2rem;
`;
const ArrowIconRight = styled(ChevronRight)`
  font-size: 2rem;
`;

const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 1rem;
  column-gap: 4rem;
  margin-top: 16px;

  .weekdays {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    font-weight: bold;
  }
`;

const DayCell = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &.current-day {
    background-color: blue;
    color: white;
  }
  &.selected-day {
    background-color: orange;
    color: black;
  }
`;

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      const prevYear = prevDate.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const nextYear = prevDate.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const days = [];

    const currentDate = new Date(); // Get the current date

    const handleDayClick = (day) => {
      setSelectedDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
      );
    };

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < weekdays.length; i++) {
      days.push(
        <div key={`weekday-${i}`} className="weekdays">
          {weekdays[i]}
        </div>
      );
    }

    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(<DayCell key={`prev-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        i === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      const isSelectedDay =
        i === selectedDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      days.push(
        <DayCell
          key={i}
          onClick={() => handleDayClick(i)}
          className={`${isCurrentDay ? "current-day" : ""} ${
            isSelectedDay ? "selected-day" : ""
          }`}
        >
          {i}
        </DayCell>
      );
    }

    return days;
  };
  return (
    <CalendarWithTasksContainer>
      <TaskListContainer>
        <TaskList selectedDate={selectedDate} />
      </TaskListContainer>
      <CalendarContainer>
        <CalendarControlContainer>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowIconLeft />
          </IconButton>
          <MonthYear sx={{ width: "20vw", textAlign: "center" }} variant="h5">
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </MonthYear>
          <IconButton onClick={handleNextMonth}>
            <ArrowIconRight />
          </IconButton>
        </CalendarControlContainer>
        <GridContainer>{renderCalendarDays()}</GridContainer>
      </CalendarContainer>
    </CalendarWithTasksContainer>
  );
};

export default Calendar;
