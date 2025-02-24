

import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const TaskItem = ({ task, index, fetchTasks }) => {

//  for update modal open with state

const [openModal,setOpenModal] = useState(false);

const handelUpdateTask = (title) => {
  setOpenModal(true);
}
   
    

  //  handel delete task
  const handelDeleteTask = async (title)=>
  {
   

    try {
        const response = await fetch(`http://localhost:5000/deleteTask`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
    
        const data = await response.json();
        // console.log("Updated Task:", data);
    
        if (data.success) {
          Swal.fire({
            title: "Task Delete!",
            text: data.message,
            icon: "success",
          });
          fetchTasks();
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
  }
 
  return (
    <>
    <Draggable draggableId={`task-${task}-${index}`} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="p-3 bg-white text-gray-900 rounded-md shadow-md flex justify-between items-center cursor-grab"
        >
          <span>{task}</span>
          <div className="flex gap-2">
            <button onClick={()=>handelUpdateTask(task)} className="px-2 py-1 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 cursor-pointer">✏️</button>
            <button onClick={()=>handelDeleteTask(task)} className="px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 cursor-pointer">🗑️</button>
          </div>
        </motion.div>
      )}

     
    </Draggable>
     {openModal && <UpdateModal fetchTasks={fetchTasks} setOpenModal={setOpenModal}></UpdateModal>}
     </>
  );
};

export default TaskItem;
