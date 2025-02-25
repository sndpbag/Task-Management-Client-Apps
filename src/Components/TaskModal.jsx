// import { useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../Provider/AuthProvider";

 

// const TaskModal = ({ setIsModalOpen, fetchTasks }) => {

//   //  use context api for user info
//   const {user} = useContext(AuthContext);

//   const handelAddTask = async (e)=>{
//     e.preventDefault();
//     const user_email = user.email;
//     const title = e.target.title.value;
//     const category = e.target.category.value;
//     const description = e.target.description.value;
//     const endDateTime = e.target.endDateTime.value;
//  const task = {title,category,description,endDateTime,user_email};
 
//  const response = await fetch("http://localhost:5000/add-task", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(task),
// });

// const result = await response.json();
// if(result.taskId)
// {
// Swal.fire({
//   position: "top-end",
//   icon: "success",
//   title: "Your Task is Add",
//   showConfirmButton: false,
//   timer: 1500})

//   e.target.reset();
//   setIsModalOpen(false);
//   fetchTasks();

// }
// else
// {
//   Swal.fire({
//     icon: "error",
//     title: "Oops...",
//     text: result.message,
//     footer: '<a href="#">Why do I have this issue?</a>'
//   });
// }
 
    
//   }
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <form onSubmit={handelAddTask}>
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//           <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          
//           {/* Task Title Input */}
//           <input
//             type="text"
//             name="title"
//             placeholder="Task Title"
//             className="w-full p-2 border rounded mb-4"
//           />

//                {/* Task description Input */}
//                <input
//             type="text"
//             name="description"
//             placeholder="Enter Description"
//             className="w-full p-2 border rounded mb-4"
//           />

//                  {/* Task date and time Input */}
//                  <input
//             type="datetime-local"
//             name="endDateTime"
             
//             className="w-full p-2 border rounded mb-4"
//           />
  
//           {/* Status Dropdown */}
//           <select name="category" className="w-full p-2 border rounded mb-4">
//             <option value="todo">To-Do</option>
//             <option value="inProgress">In Progress</option>
//             <option value="done">Done</option>
//           </select>
  
//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3">
//             <button
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Cancel
//             </button>
//             <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Save
//             </button>
//           </div>
//         </div>
//         </form>
//       </div>
//     );
// };

// export default TaskModal;

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import { FiX, FiCalendar, FiAlignLeft, FiTag, FiSave } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

const TaskModal = ({ setIsModalOpen, fetchTasks }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    endDateTime: "",
    category: "todo"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Task title required",
        text: "Please enter a title for your task",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const task = {
        ...formData,
        user_email: user.email
      };

      const response = await fetch(`${API_URL}/add-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const result = await response.json();
      
      if (result.taskId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task successfully added",
          showConfirmButton: false,
          timer: 1500
        });
        
        e.target.reset();
        setIsModalOpen(false);
        fetchTasks();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add task",
          text: result.message || "An unknown error occurred",
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Failed to connect to the server. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Category badge color mapping
  const categoryColors = {
    todo: "bg-red-100 text-red-800 border-red-200",
    inProgress: "bg-yellow-100 text-yellow-800 border-yellow-200",
    done: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Create New Task</h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleAddTask} className="p-6">
          {/* Task Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
            />
          </div>
          
          {/* Task Description Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
              <FiAlignLeft className="mr-1.5" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about this task..."
              rows="3"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
            />
          </div>
          
          {/* Due Date Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
              <FiCalendar className="mr-1.5" />
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
            />
          </div>
          
          {/* Status Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
              <FiTag className="mr-1.5" />
              Status
            </label>
            <div className="relative">
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block appearance-none w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
              >
                <option value="todo">To-Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Preview of selected category */}
          <div className="mb-6 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Selected category:</span>
            <span className={`text-xs px-2.5 py-1 rounded-full border ${categoryColors[formData.category]}`}>
              {formData.category === "todo" ? "To-Do" : 
               formData.category === "inProgress" ? "In Progress" : "Done"}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-1.5" />
                  Save Task
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskModal;