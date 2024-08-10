import React from "react";

interface TaskProps {
  title: string;
  description: string;
}

const Task: React.FC<TaskProps> = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const TaskList: React.FC = () => {
  const tasks = [
    { title: "Task 1", description: "Description for Task 1" },
    { title: "Task 2", description: "Description for Task 2" },
    { title: "Task 3", description: "Description for Task 3" },
  ];

  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} title={task.title} description={task.description} />
      ))}
    </div>
  );
};

export default TaskList;
