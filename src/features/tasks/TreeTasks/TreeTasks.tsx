import React from "react";
import styles from "./TreeTasks.module.scss";
import { treeStore } from "../../../app/store";
import { TaskBlock } from "../TaskBlock/TaskBlock";
import { AddTask } from "../AddTask/AddTask";
import { observer } from "mobx-react-lite";

export const TreeTasks: React.FC = observer(() => {
  return (
    <div className={styles.mainContainer}>
      <AddTask />
      <div className={styles.treeContainer}>
        {treeStore.tasks.map((elem) => (
          <TaskBlock key={elem.id} task={elem} />
        ))}
      </div>
    </div>
  );
});
