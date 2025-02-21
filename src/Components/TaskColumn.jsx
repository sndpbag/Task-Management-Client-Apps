

import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, id, bgColor, tasks }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[100px] p-2 bg-gray-800 rounded-lg"
          >
            {tasks.map((task, index) => (
              <TaskItem key={`${id}-${index}`} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;





 