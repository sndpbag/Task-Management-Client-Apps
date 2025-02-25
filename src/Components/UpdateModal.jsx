// import axios from "axios";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

 
 


// const UpdateModal = ({setOpenModal,fetchTasks,updateinfo}) => {


//     const [category, setCategory] = useState("");
//    // Update category when updateinfo is available
//     useEffect(()=>{
//         if(updateinfo?.category)
//         {
//             setCategory(updateinfo?.category);
//         }
      
//     },[updateinfo])

//     const handeludateTask = async (e)=>
//         {
//            e.preventDefault();
//            const title = e.target.title.value;
//            const description = e.target.description.value;
//            const endDateTime = e.target.endDateTime.value;
//            const category = e.target.category.value;
//            const task = {title,description,endDateTime,category};
//            console.log(task);

//            try {
//             const response = await axios.put('http://localhost:5000/update/task',task);
//             console.log(response);
//             if(response.data.success)
//             {
//                 Swal.fire({
//                 title: "Task Updated!",
//                 text: response.data.message,
//                 icon: "success",
//                 })
//                 fetchTasks();
//                 setOpenModal(false);
//             }
//             fetchTasks();

//            } catch (error) {
//                 console.log(error.message);
//            }
           
//         }





//     return (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-50 flex justify-center items-center">
//         <form onSubmit={handeludateTask}>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Update Your Task !</h2>
        
//         {/* Task Title Input */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Task Title"
//           value={updateinfo?.title}
//           className="w-full p-2 border rounded mb-4"
//         />

//              {/* Task description Input */}
//              <input
//           type="text"
//           name="description"
//           placeholder="Enter Description"
//           defaultValue={updateinfo?.description}
//           className="w-full p-2 border rounded mb-4"
//         />

//                {/* Task date and time Input */}
//                <input
//           type="datetime-local"
//           name="endDateTime"
//           defaultValue={updateinfo?.endDateTime}
//           className="w-full p-2 border rounded mb-4"
//         />

//         {/* Status Dropdown */}
//         <select name="category" value={category}

//         onChange={e=>setCategory(e.target.value)}
//          className="w-full p-2 border rounded mb-4">

//           <option value="todo">To-Do</option>
//           <option value="inProgress">In Progress</option>
//           <option value="done">Done</option>
//         </select>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <button
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//             onClick={() => setOpenModal(false)}
//           >
//             Cancel
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             Save
//           </button>
//         </div>
//       </div>
//       </form>
//     </div>
//     );
// };

// export default UpdateModal;


import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiSave, FiX, FiAlertCircle, FiCalendar, FiEdit, FiTag } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

const UpdateModal = ({ setOpenModal, fetchTasks, updateinfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    endDateTime: "",
    category: "todo"
  });

  // Update form data when updateinfo is available
  useEffect(() => {
    if (updateinfo) {
      setFormData({
        id:updateinfo._id || "",
        title: updateinfo.title || "",
        description: updateinfo.description || "",
        endDateTime: updateinfo.endDateTime || "",
        category: updateinfo.category || "todo"
      });
    }
  }, [updateinfo]);

  console.log(updateinfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`${API_URL}/update/task`, formData);
      
      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your task has been updated",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
        fetchTasks();
        setOpenModal(false);
      } else {
        throw new Error(response.data.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        title: "Update Failed",
        text: error.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Category styling
  const getCategoryStyle = (categoryValue) => {
    const styles = {
      todo: "bg-red-50 text-red-700 border-red-200",
      inProgress: "bg-amber-50 text-amber-700 border-amber-200",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200"
    };
    return styles[categoryValue] || styles.todo;
  };

  const getCategoryLabel = (category) => {
    return {
      todo: "To-Do",
      inProgress: "In Progress",
      done: "Completed"
    }[category] || "To-Do";
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && setOpenModal(false)}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with task status badge */}
        <div className="relative p-6 pb-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Update Task
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Make changes to your task details
              </p>
            </div>
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border ${getCategoryStyle(formData.category)}`}>
            <span className="w-2 h-2 rounded-full bg-current mr-1.5"></span>
            {getCategoryLabel(formData.category)}
          </div>
        </div>

        <form onSubmit={handleUpdateTask} className="p-6">
          {/* Task Title Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <div className="flex items-center">
                <FiEdit className="mr-2" />
                Task Title
              </div>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
              required
            />
          </div>

          {/* Task Description Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <div className="flex items-center">
                <FiAlertCircle className="mr-2" />
                Description
              </div>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the task in detail"
              rows="3"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all resize-none"
            />
          </div>

          {/* Due Date Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                Due Date & Time
              </div>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <div className="flex items-center">
                <FiTag className="mr-2" />
                Status
              </div>
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block appearance-none w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
              >
                <option value="todo">To-Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              onClick={() => setOpenModal(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-1.5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateModal;