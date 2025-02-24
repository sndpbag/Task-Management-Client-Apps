

import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { motion } from "framer-motion";

const TaskColumn = ({ title, id, bgColor, tasks ,fetchTasks }) => {

   
  
  return (
    <div className={`${bgColor}  p-4 rounded-lg shadow-lg`}>
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>

      <Droppable droppableId={id}>
        {(provided) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[100px] p-2 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tasks.map((task, index) => (
              <TaskItem key={`${id}-${index}`} fetchTasks={fetchTasks}   task={task} index={index} />
            ))}
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;





 