import TaskItem from "./TaskItem";


 

const TaskColumn = ({ title, bgColor, tasks }) => {
    return (
        <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
        <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>
      </div>
    );
};

export default TaskColumn;




 