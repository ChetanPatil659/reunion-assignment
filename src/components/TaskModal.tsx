import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";  // Importing Switch from ShadCN
import { AiOutlineEdit } from "react-icons/ai";

interface Task {
  _id: string;
  title: string;
  priority: number;
  status: "pending" | "completed";
  startDate: string;
  endDate: string;
}

interface TaskModalProps {
  isEdit?: boolean;
  taskData?: Task;
  onSave?: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isEdit = false,
  taskData = {
    title: "",
    priority: 1,
    status: "pending",
    startDate: "",
    endDate: "",
    _id: "",
  },
  onSave,
}) => {
  const [name, setName] = useState(taskData.title);
  const [priority, setPriority] = useState(taskData.priority);
  const [status, setStatus] = useState(taskData.status);
  const [startDate, setStartDate] = useState(taskData.startDate);
  const [endDate, setEndDate] = useState(taskData.endDate);

  const handleSave = () => {
    const task: Task = { title: name, priority, status, startDate, endDate, _id: taskData._id };
    if (onSave) {
      // console.log(taskData._id)
      onSave(task);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isEdit ? "ghost" : "outline"} className={`${isEdit ? "" : "border-blue-500 bg-blue-100 text-blue-600 hover:text-blue-600"}`}>
          {isEdit ? <AiOutlineEdit fontSize={20} cursor={"pointer"} /> : "Add Task"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the details of your task below." : "Fill out the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        {/* Task Form */}
        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={taskData.title}
              className="mt-1"
            />
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={String(taskData.priority)} onValueChange={(value) => setPriority(Number(value))}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((p) => (
                  <SelectItem key={p} value={String(p)}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status - Switch button */}
          <div className="flex items-center justify-between">
            <Label>Status</Label>
            <div className="flex items-center gap-2">
                <Label>{status}</Label>
                {/* ShadCN Switch for task status */}
                <Switch
                checked={status === "completed"}
                onCheckedChange={(checked) => setStatus(checked ? "completed" : "pending")}
                />
            </div>
          </div>

          {/* Start and End Date - Side by side (Responsive) */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Date */}
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="datetime-local"
                placeholder={taskData.startDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* End Date */}
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                placeholder={taskData.endDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleSave}>
            {isEdit ? "Update Task" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
