

import { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ State: Dynamic task categories
  const [tasks, setTasks] = useState({
    todo: ["Learn React", "Study JavaScript"],
    inProgress: ["Build a project"],
    done: ["Install Node.js"],
  });

  // ✅ Drag & Drop Handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceTasks = Array.from(tasks[source.droppableId]);
    const destTasks = Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        + Create Task
      </button>

      {/* ✅ Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div className="grid grid-cols-3 gap-6 w-full max-w-5xl"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
        >
          <TaskColumn title="To-Do" id="todo" bgColor="bg-red-500" tasks={tasks.todo} />
          <TaskColumn title="In Progress" id="inProgress" bgColor="bg-yellow-500" tasks={tasks.inProgress} />
          <TaskColumn title="Done" id="done" bgColor="bg-green-500" tasks={tasks.done} />
        </motion.div>
      </DragDropContext>

      {/* Task Modal */}
      {isModalOpen && <TaskModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
