 

const TaskModal = ({ setIsModalOpen }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          
          {/* Task Title Input */}
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-2 border rounded mb-4"
          />
  
          {/* Status Dropdown */}
          <select className="w-full p-2 border rounded mb-4">
            <option value="todo">To-Do</option>
            <option value="in-progress">In Progress</option>
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
      </div>
    );
};

export default TaskModal;