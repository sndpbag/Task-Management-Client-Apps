import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

 

const TaskModal = ({ setIsModalOpen, fetchTasks }) => {

  //  use context api for user info
  const {user} = useContext(AuthContext);

  const handelAddTask = async (e)=>{
    e.preventDefault();
    const user_email = user.email;
    const title = e.target.title.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const endDateTime = e.target.endDateTime.value;
 const task = {title,category,description,endDateTime,user_email};
 
 const response = await fetch("http://localhost:5000/add-task", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(task),
});

const result = await response.json();
if(result.taskId)
{
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your Task is Add",
  showConfirmButton: false,
  timer: 1500})

  e.target.reset();
  setIsModalOpen(false);
  fetchTasks();

}
else
{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: result.message,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}
 
    
  }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handelAddTask}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          
          {/* Task Title Input */}
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="w-full p-2 border rounded mb-4"
          />

               {/* Task description Input */}
               <input
            type="text"
            name="description"
            placeholder="Enter Description"
            className="w-full p-2 border rounded mb-4"
          />

                 {/* Task date and time Input */}
                 <input
            type="datetime-local"
            name="endDateTime"
             
            className="w-full p-2 border rounded mb-4"
          />
  
          {/* Status Dropdown */}
          <select name="category" className="w-full p-2 border rounded mb-4">
            <option value="todo">To-Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
  
          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
        </form>
      </div>
    );
};

export default TaskModal;