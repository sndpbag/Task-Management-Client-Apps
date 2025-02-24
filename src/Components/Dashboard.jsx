

import { useContext, useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  context api for user email
  const { user } = useContext(AuthContext);


  // ✅ State: Dynamic task categories
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const fetchTasks = async () => {

    if (!user?.email) return; // Ensure user is logged in before fetching
    
    try {
      const response = await fetch(`http://localhost:5000/tasks/${user.email}`);
      const data = await response.json();
      // console.log(data); // Check response
      // ✅ Organizing tasks by category
      const categorizedTasks = {
        todo: [],
        inProgress: [],
        done: [],
      };

      data.forEach((task) => {
        if (categorizedTasks[task.category]) {
          categorizedTasks[task.category].push(task.title); // Storing titles only

        }
      });

      setTasks(categorizedTasks);



    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  // ✅ Fetch tasks when the component mounts
  useEffect(() => {
   

  

    fetchTasks();
  }, [user?.email]); // R








  // ✅ Drag & Drop Handler
  const handleDragEnd = async (result) => {
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


    // console.log(result);
    // ✅ API Call to update task category in MongoDB
    try {
      const response = await fetch(`http://localhost:5000/updateTask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: destination.droppableId, title: result?.draggableId }),
      });

      const data = await response.json();
      console.log("Updated Task:", data);

      if (data.success) {
        Swal.fire({
          title: "Task Moved!",
          text: data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Task Moved!",
          text: data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update task category.",
        icon: "error",
      });
    }
  };

  //  for dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };



  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        + Create Task
      </button>


      {/* Dark Mode Toggle Button 🌙 */}
      <button
        onClick={toggleDarkMode}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg"
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ✅ Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TaskColumn title="To-Do" id="todo" bgColor="bg-red-500" fetchTasks={fetchTasks} tasks={tasks.todo} />
          <TaskColumn title="In Progress" id="inProgress" bgColor="bg-yellow-500" fetchTasks={fetchTasks} tasks={tasks.inProgress} />
          <TaskColumn title="Done" id="done" bgColor="bg-green-500" fetchTasks={fetchTasks} tasks={tasks.done} />
        </motion.div>
      </DragDropContext>

      {/* Task Modal */}
      {isModalOpen && <TaskModal fetchTasks={fetchTasks} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
