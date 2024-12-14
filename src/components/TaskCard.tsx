import { useDispatch } from "react-redux";
import TaskModal from "./TaskModal";
import { Checkbox } from "./ui/checkbox";
import { getTodo, updateTodo } from "@/store/todoSlice";

type TaskType = {
  _id: string;
  title: string;
  priority: number;
  status: string;
  startDate: string;
  endDate: string;
  totalTime: string;
  onCheckboxChange: () => {};
};

const TaskCard = ({ task }: { task: TaskType }) => {
  const dispatch = useDispatch();
  const {
    _id,
    title = "Task Name",
    priority = 3,
    status = "In Progress",
    startDate = "Start Date",
    endDate = "End Date",
    totalTime = "Total Time",
    // onCheckboxChange = (e: any) => {
    //   console.log(e);
    // },
  } = task;

  return (
    // <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    //   <div className="bg-white shadow-[6px_6px_6px_-6px_rgba(0,0,0,0.1)] rounded-xl h-full w-full px-8 py-4 flex items-center gap-3 justify-between">
    //     {/* Checkbox and Task Name */}
    //     <div className="flex items-center gap-3 w-fit max-w-full">
    //       <Checkbox
    //         onCheckedChange={(e) => console.log(e)}
    //         className="h-6 w-6"
    //       />
    //       <p className="text-lg font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap max-w-lg">
    //         {name}
    //       </p>
    //     </div>

    //     <div className="flex items-center justify-center gap-8">
    //       {/* Priority */}
    //       <div className="flex items-center gap-2">
    //         <p className="text-sm font-semibold text-gray-600">Priority:</p>
    //         <div className="flex gap-1">
    //           {[...Array(5)].map((_, index) => (
    //             <span
    //               key={index}
    //               className={`h-4 w-4 rounded-full ${
    //                 index < priority ? "bg-red-500" : "bg-gray-300"
    //               }`}
    //             ></span>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Status */}
    //       <div className="flex items-center gap-2">
    //         <span
    //           className={`px-2 py-1 rounded-full text-sm ${
    //             status === "Completed"
    //               ? "bg-green-100 text-green-600"
    //               : status === "In Progress"
    //               ? "bg-blue-100 text-blue-600"
    //               : "bg-gray-100 text-gray-600"
    //           }`}
    //         >
    //           {status}
    //         </span>
    //       </div>

    //       {/* Dates */}
    //       <div className="text-sm text-gray-600">
    //         <p>
    //           <span className="font-semibold">Start:</span> {startDate}
    //         </p>
    //         <p>
    //           <span className="font-semibold">End:</span> {endDate}
    //         </p>
    //       </div>

    //       {/* Total Time */}
    //       <div className="text-sm text-gray-600">
    //         <p>
    //           <span className="font-semibold">Total Time:</span> {totalTime}
    //         </p>
    //       </div>

    //       <div className="text-sm text-gray-600">
    //           <AiOutlineEdit fontSize={20} cursor={"pointer"}/>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="bg-white shadow-[6px_6px_6px_-6px_rgba(0,0,0,0.1)] rounded-xl w-full px-8 py-4 flex flex-col lg:flex-row gap-4 lg:gap-3 justify-between">
        {/* Checkbox and Task Name */}
        <div className="flex items-center gap-3 w-full lg:w-fit max-w-full">
          <Checkbox
            onCheckedChange={(e) => console.log(e)}
            className="h-6 w-6 flex-shrink-0"
          />
          <p className="text-lg font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap max-w-full lg:max-w-lg">
            {title}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 w-2/3">
          {/* Priority */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-600">Priority:</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`h-4 w-4 rounded-full ${
                    index < priority ? "bg-red-500" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : status === "In Progress"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-semibold">Start:</span> {new Date(startDate).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">End:</span> {new Date(endDate).toLocaleString()}
            </p>
          </div>

          {/* Total Time */}
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-semibold">Total Time:</span> {totalTime}
            </p>
          </div>

          {/* Edit Icon */}
          <div className="text-sm text-gray-600">
            <TaskModal
              isEdit
              taskData={{
                _id: task._id,
                title: task.title,
                priority: task.priority,
                status: task.status,
                startDate: task.startDate,
                endDate: task.endDate,
              }}
              onSave={(task) => {
                dispatch(updateTodo(task));
                dispatch(getTodo());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
