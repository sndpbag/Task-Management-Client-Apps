 

const TaskItem = ({ task }) => {
    return (
        <div className="p-3 bg-white text-gray-900 rounded-md shadow-md flex justify-between items-center">
      <span>{task}</span>
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600">
          ✏️
        </button>
        <button className="px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600">
          🗑️
        </button>
      </div>
    </div>
    );
};

export default TaskItem;