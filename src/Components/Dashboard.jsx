import { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";

 

const Dashboard = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
   

    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
    {/* Create Task Button */}
    <button  onClick={() => setIsModalOpen(true)} className="mb-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
      + Create Task
    </button>

    <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
      {/* To-Do Column */}
      <TaskColumn title="To-Do" bgColor="bg-red-500" tasks={["Task 1", "Task 2", "Task 3"]} />

      {/* In Progress Column */}
      <TaskColumn title="In Progress" bgColor="bg-yellow-500" tasks={["Task 4", "Task 5"]} />

      {/* Done Column */}
      <TaskColumn title="Done" bgColor="bg-green-500" tasks={["Task 6"]} />
    </div>
       {/* Task Modal */}
       {isModalOpen && <TaskModal setIsModalOpen={setIsModalOpen} />}

  </div>

    );
};

export default Dashboard;