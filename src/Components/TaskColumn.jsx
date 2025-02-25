



// // TaskColumn.jsx
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";


const TaskColumn = ({ title, id, bgColor, tasks, fetchTasks }) => {
  const taskCount = tasks.length;

  console.log(tasks)
  
  return (
    <motion.div
      className={`bg-gray-800 p-4 rounded-lg shadow-lg border-t-4 ${bgColor} flex flex-col h-full`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Column Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <span className="ml-2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
            {taskCount}
          </span>
        </div>
      </div>
      
      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow space-y-3 p-2 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-600 rounded-lg">
                <p className="text-gray-500 text-sm">No tasks yet</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskItem 
                  key={task} 
                  task={task.title} 
                  description = {task.description}
                  id = {task._id}
                  date = {task.endDateTime}
                  index={index} 
                  fetchTasks={fetchTasks}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </motion.div>
  );
};

export default TaskColumn;

 