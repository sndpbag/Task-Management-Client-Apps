


import { useContext, useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL)

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user,logOutbyGoogle } = useContext(AuthContext);

  // ✅ State: Store Full Task Objects
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // ✅ Fetch tasks from API & store full details
  const fetchTasks = async () => {
    if (!user?.email) return; // Ensure user is logged in before fetching

    try {
      const response = await axios.get(`${API_URL}/tasks/${user.email}`);
      // const data = await response.json();
      const data = response.data; // ✅ Correct
       

      // ✅ Organizing tasks by category (store full task objects)
      const categorizedTasks = {
        todo: [],
        inProgress: [],
        done: [],
      };

      data.forEach((task) => {
        if (categorizedTasks[task.category]) {
          categorizedTasks[task.category].push(task); // Store full object
        }
      });

      setTasks(categorizedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [user?.email]);


  //  logout system

  const handleLogout = () => {
    logOutbyGoogle()
    .then(()=>{
       alert("Welcome again")
    }).catch(
      error => console.log(error)
    )
  }

  // ✅ Drag & Drop Handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Clone task lists
    const sourceTasks = Array.from(tasks[source.droppableId]);
    const destTasks = Array.from(tasks[destination.droppableId]);

    // Find the moved task
    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId; // Update category

    // Add task to the new column
    destTasks.splice(destination.index, 0, movedTask);

    // Update state
    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    }));

    // ✅ API Call to update task in MongoDB with full details
    try {
      const response = await fetch(`${API_URL}/updateTask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movedTask), // Send full task object
      });

      const data = await response.json();
      console.log("Updated Task:", data);

      Swal.fire({
        title: data.success ? "Task Moved!" : "Error!",
        text: data.message,
        icon: data.success ? "success" : "error",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update task category.",
        icon: "error",
      });
    }
  };

  // ✅ Dark Mode Handling
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
      {/* Create Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        + Create Task
      </button>

      {/* Dark Mode Toggle Button */}
      <div className="mb-6 flex gap-4">
  <button
    onClick={toggleDarkMode}
    className="cursor-pointer px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg"
  >
    {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>

  <button
    onClick={handleLogout} // Define this function in your component
    className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg"
  >
    🔒 Logout
  </button>
</div>

      {/* ✅ Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
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

