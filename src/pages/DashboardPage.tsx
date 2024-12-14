import Navbar from '@/components/Navbar'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const tasks = [
  {
    id: 1,
    name: "Design Landing Page",
    priority: 4,
    status: "In Progress",
    startDate: "2024-12-10",
    endDate: "2024-12-15",
    totalTime: 5, // in days
  },
  {
    id: 2,
    name: "Fix Backend API Issue",
    priority: 3,
    status: "Completed",
    startDate: "2024-12-08",
    endDate: "2024-12-09",
    totalTime: 1, // in days
  },
  {
    id: 3,
    name: "Prepare Sprint Planning",
    priority: 5,
    status: "Pending",
    startDate: "2024-12-13",
    endDate: "2024-12-16",
    totalTime: 3, // in days
  },
];

export default function DashboardPage() {
  const {user} = useSelector(state => state.user);
  const dashboardSummary = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Completed")
      .length;
    const pendingTasks = tasks.filter((task) => task.status === "Pending")
      .length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const totalTimeCompleted = tasks
      .filter((task) => task.status === "Completed")
      .reduce((sum, task) => sum + task.totalTime, 0);

    const averageTimeToComplete =
      completedTasks > 0 ? totalTimeCompleted / completedTasks : 0;

    const pendingSummary = tasks
      .filter((task) => task.status === "Pending")
      .map((task) => {
        const now = new Date();
        const endTime = new Date(task.endDate);
        const timeLapsed = Math.max(
          0,
          Math.ceil((now - new Date(task.startDate)) / (1000 * 60 * 60 * 24))
        );
        const timeLeft = Math.max(
          0,
          Math.ceil((endTime - now) / (1000 * 60 * 60 * 24))
        );

        return {
          ...task,
          timeLapsed,
          timeLeft,
        };
      });

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      completionPercentage: ((completedTasks / totalTasks) * 100).toFixed(1),
      averageTimeToComplete,
      pendingSummary,
    };
  }, [tasks]);

  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    completionPercentage,
    averageTimeToComplete,
    pendingSummary,
  } = dashboardSummary;

  return (
    <>
      <Navbar />
      {/* <div className="container mx-auto px-4 py-3 flex justify-between items-center mt-7">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Dashboard
        </h2>
      </div> */}

      <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">Total Tasks</h2>
          <p className="text-2xl font-bold text-gray-800">{user?.todos?.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">Tasks Completed</h2>
          <p className="text-2xl font-bold text-green-600">
            {(user?.completedTodos / (user?.pendingTodos + user?.completedTodos) * 100) || 0}%
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Average Time to Complete
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {user?.averageTimeToComplete.toFixed(0)} hrs
          </p>
        </div>
      </div>

      {/* Pending Task Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Task Summary</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 py-2">Task Name</th>
              <th className="border-b-2 border-gray-200 py-2">Time Lapsed</th>
              <th className="border-b-2 border-gray-200 py-2">Time Left</th>
              <th className="border-b-2 border-gray-200 py-2">Total Time</th>
            </tr>
          </thead>
          <tbody>
            {user?.todos?.map((task) => {
              return(
              <tr key={task.id}>
                <td className="py-2 border-b border-gray-200">{task.title}</td>
                <td className="py-2 border-b border-gray-200">
                  {task.elapsedTime.toFixed(0)} hrs
                </td>
                <td className="py-2 border-b border-gray-200">
                  {task.timeLeft.toFixed(0)} hrs
                </td>
                <td className="py-2 border-b border-gray-200">
                  {task.totalTime.toFixed(0)} hrs
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* Other Status Counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-blue-800">Completed Tasks</h2>
          <p className="text-2xl font-bold">{user?.pendingTodos}</p>
        </div>
        <div className="bg-yellow-100 shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-yellow-800">Pending Tasks</h2>
          <p className="text-2xl font-bold">{user?.completedTodos}</p>
        </div>
      </div>
    </div>
    </>
  )
}
