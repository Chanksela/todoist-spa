import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/init";

export default {
  methods: {
    // delete the task
    async deleteTask(taskId) {
      try {
        await deleteDoc(doc(db, "tasks", taskId));
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    },
  },
};
