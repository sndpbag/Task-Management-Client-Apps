 
 

 const handeludateTask = ()=>
 {
    
 }

const UpdateModal = ({setOpenModal,fetchTasks}) => {
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-50 flex justify-center items-center">
        <form onSubmit={handeludateTask}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Your Task !</h2>
        
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
            onClick={() => setOpenModal(false)}
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

export default UpdateModal;