import React, { useState } from "react";
import styles from "./TaskBlock.module.scss";
import { observer } from "mobx-react-lite";
import { treeStore } from "../../../app/store";
import { CheckboxComponent } from "../../../shared/components/CheckboxComponent";
import { AddSubTask } from "../AddSubTask/AddSubTask";
import plus from "../../../assets/icons/plus.svg";

interface TaskBlockProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
    subTasks: any[];
  };
}

export const TaskBlock: React.FC<TaskBlockProps> = observer(({ task }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleTask = () => {
    treeStore.toggleTask(task.id);
  };
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemCont}>
        <div className={styles.itemTitle}>
          <CheckboxComponent checked={task.completed} onChange={toggleTask} />
          <p>{task.text}</p>
        </div>
        <img
          src={plus}
          alt="plus"
          className={styles.itemIcon}
          onClick={() => setIsOpen(true)}
        />
        <AddSubTask
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          parentId={task.id}
        />
      </div>
      {task.subTasks.length > 0 ? (
        <div className={styles.subtasksContainer}>
          <p className={styles.subtasksTitle}>Подзадачи:</p>
          <div className={styles.subtasksCont}>
            {task.subTasks.map((subtask) => (
              <TaskBlock key={subtask.id} task={subtask} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});
