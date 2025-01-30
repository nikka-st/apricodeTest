import { observer } from "mobx-react-lite";
import styles from "./AddSubTask.module.scss";
import { useState } from "react";
import { treeStore } from "../../../app/store";
import { InputComponent } from "../../../shared/components/InputComponent/InputComponent";

interface AddSubTaskProps {
  isOpen: boolean;
  onClose: () => void;
  parentId: number;
}

export const AddSubTask: React.FC<AddSubTaskProps> = observer(
  ({ isOpen, onClose, parentId }) => {
    const [textSubTask, setTextSubTask] = useState<string>("");
    if (!isOpen) return;

    const addSubTask = () => {
      if (textSubTask.trim()) {
        treeStore.addSubTask(textSubTask, parentId);
        setTextSubTask("");
        onClose();
      }
    };
    return (
      <div className={styles.modal} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.closeBtn} onClick={onClose}>
            &times;
          </span>
          <InputComponent
            value={textSubTask}
            onChange={(e) => setTextSubTask(e.target.value)}
            func={addSubTask}
          />
        </div>
      </div>
    );
  }
);
