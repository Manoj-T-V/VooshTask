import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const apiUrl = process.env.REACT_APP_API_URL;

const TaskStatus = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await axios.get(`${apiUrl}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId; // Update status based on droppableId
    updatedTasks.splice(destination.index, 0, movedTask);

    try {
      await axios.put(`${apiUrl}/api/tasks/${movedTask._id}`, movedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={TaskStatus.TODO}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ margin: '0 8px', border: '1px solid lightgray', borderRadius: '4px', width: '300px', minHeight: '500px' }}
          >
            <h2>TODO</h2>
            {getTasksByStatus(TaskStatus.TODO).map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ padding: '8px', margin: '0 0 8px 0', border: '1px solid lightgray', borderRadius: '4px', background: 'white', ...provided.draggableProps.style }}
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={TaskStatus.IN_PROGRESS}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ margin: '0 8px', border: '1px solid lightgray', borderRadius: '4px', width: '300px', minHeight: '500px' }}
          >
            <h2>In Progress</h2>
            {getTasksByStatus(TaskStatus.IN_PROGRESS).map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ padding: '8px', margin: '0 0 8px 0', border: '1px solid lightgray', borderRadius: '4px', background: 'white', ...provided.draggableProps.style }}
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={TaskStatus.DONE}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ margin: '0 8px', border: '1px solid lightgray', borderRadius: '4px', width: '300px', minHeight: '500px' }}
          >
            <h2>Done</h2>
            {getTasksByStatus(TaskStatus.DONE).map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ padding: '8px', margin: '0 0 8px 0', border: '1px solid lightgray', borderRadius: '4px', background: 'white', ...provided.draggableProps.style }}
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskBoard;
