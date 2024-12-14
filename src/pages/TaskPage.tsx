import Navbar from "../components/Navbar.tsx";
import TaskCard from "@/components/TaskCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import TaskModal from "@/components/TaskModal.tsx";
import DeleteButtonWithDialog from "@/components/DeleteButtonWithDialog.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTodo, getTodo } from "@/store/todoSlice.ts";

interface Todo {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: number;
  elapsedTime: number;
  timeLeft: number;
}

export default function TaskPage() {
  const {todo} = useSelector(state => state?.todos);
  const [todos, setTodos] = useState<Todo[]>(todo)
  const dispatch = useDispatch();
  // console.log(todo)
  // Sort by start and end date (ascending or descending)
const sortByDate = (todos: [], field: 'startDate' | 'endDate' | 'All', order = "asc") => {
  if(field === 'All'){
    return todos
  }
  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();
    
    if (order === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  
  console.log(sortedTodos)
  setTodos(sortedTodos);
};

// Sort by priority
const sortByPriority = (todos: [], priority: string) => {
  if(priority === 'All'){
    return todos
  }
  return setTodos(pre => {
    let temp = [...todos].filter((a) => a.priority == priority);
    return [...temp];
  });
};

// Filter by status (e.g., "completed" or "pending")
const filterByStatus = (todos: [], status: 'pending' | 'completed' | 'All') => {
  if(status === 'All'){
    return todos
  }
  return setTodos(pre =>{
    let temp = todos.filter((todo) => todo?.status === status);
    return [...temp];
  })
};

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-3 flex justify-between items-center mt-7">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Task list
        </h2>
      </div>

      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <TaskModal onSave={(data) => {
            dispatch(createTodo(data))
            dispatch(getTodo())
          }}/>
          <DeleteButtonWithDialog/>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Select */}
          <Select onValueChange={(e) => sortByDate(todo, e.split(" ")[0], e.split(" ")[1])}>
            <SelectTrigger className="gap-5 border-gray-300 w-48">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="startDate ASC">Start time: ASC</SelectItem>
              <SelectItem value="startDate DESC">Start time: DESC</SelectItem>
              <SelectItem value="endDate ASC">End time: ASC</SelectItem>
              <SelectItem value="endDate DESC">End time: DESC</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Select */}
          <Select onValueChange={(e) => sortByPriority(todo, e)}>
            <SelectTrigger className="gap-5 border-gray-300 w-48">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Select */}
          <Select onValueChange={(e) => {
            filterByStatus(todo, e)
          }}>
            <SelectTrigger className="gap-5 border-gray-300 w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>      

      {todos?.map((task, index) => <TaskCard key={index} task={task}/>)}
    </>
  );
}
