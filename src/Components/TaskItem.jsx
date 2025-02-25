

import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import UpdateModal from "./UpdateModal";
import axios from "axios";

const TaskItem = ({ task, description, id, date,  index, fetchTasks }) => {

//  for update modal open with state

const [openModal,setOpenModal] = useState(false);
const [updateinfo,setUpdateInfo] = useState([]);
const [timeLeft, setTimeLeft] = useState("Calculating...");


//  counte down timer for tiem left
useEffect(() => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(date);
    const difference = targetDate - now;

    if (difference <= 0) {
      setTimeLeft("Expired");
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  const timer = setInterval(calculateTimeLeft, 1000);
  calculateTimeLeft();
  return () => clearInterval(timer);
}, [date]);


//  data fetch for update
const handelUpdatefetchTask = async (id) => {
  try {
    setOpenModal(true);
    
    const response = await axios.post('http://localhost:5000/task/single/fetch', { id });

    // console.log(response.data); // ✅ Logs response data correctly
    setUpdateInfo(response.data);
    fetchTasks();
  } catch (error) {
    console.error("Error updating task:", error.response ? error.response.data : error.message);
  }
}
   
    

  //  handel delete task
  const handelDeleteTask = async (id)=>
  {
   
  
    try {
        const response = await fetch(`http://localhost:5000/deleteTask`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
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
          className="p-3 bg-white text-gray-900 rounded-md shadow-md  cursor-grab"
        >
         <div className="flex flex-col">
         <h3 className="text-xl text-sky-400">{task}</h3>
         <span>{description}</span>
         <span className="text-red-500 font-bold">{timeLeft}</span>
         </div>
          <div className="flex gap-2">
            <button onClick={()=>handelUpdatefetchTask(id)} className="px-2 py-1 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 cursor-pointer">✏️</button>
            <button onClick={()=>handelDeleteTask(id)} className="px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 cursor-pointer">🗑️</button>
          </div>
        </motion.div>
      )}

     
    </Draggable>
     {openModal && <UpdateModal updateinfo={updateinfo}  fetchTasks={fetchTasks} setOpenModal={setOpenModal}></UpdateModal>}
     </>
  );
};

export default TaskItem;

 