import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { treeStore } from "../../../app/store";
import { InputComponent } from "../../../shared/components/InputComponent/InputComponent";

export const AddTask: React.FC = observer(() => {
  const [textTask, setTextTask] = useState<string>("");

  const addTask = () => {
    if (textTask.trim()) {
      treeStore.addTask(textTask);
      setTextTask("");
    }
  };

  return (
    <InputComponent
      value={textTask}
      onChange={(e) => setTextTask(e.target.value)}
      func={addTask}
    />
  );
});
