<template>
  <div class="flex w-full items-center justify-between gap-2">
    <span v-if="task.id !== editableTaskId || !edit">
      {{ task.title }}
    </span>
    <div
      v-if="task.id === editableTaskId && edit"
      class="relative inline-block w-full"
    >
      <input
        class="w-4/5 rounded-l-lg border-b-2 border-l-2 border-t-2 border-secondary-green px-4 py-2 outline-none"
        type="text"
        minlength="3"
        v-model="editableTaskTitle"
        @keyup.enter="updateTaskName(task.id)"
      />
      <span
        @click="updateTaskName(task.id)"
        class="absolute inset-y-0 right-0 flex w-1/5 cursor-pointer items-center justify-center rounded-r-lg border-b-2 border-r-2 border-t-2 border-secondary-green bg-secondary-green px-4 py-2 text-center text-primary-green duration-300 hover:bg-primary-green hover:text-secondary-green"
      >
        Add
      </span>
    </div>
    <div
      v-if="task.id === parentTaskId && addChild"
      class="relative inline-block w-full"
    >
      <input
        class="w-4/5 rounded-l-lg border-b-2 border-l-2 border-t-2 border-secondary-green px-4 py-2 outline-none"
        type="text"
        minlength="3"
        v-model="childTaskTitle"
        @keyup.enter="addChildTask(task.id)"
      />
      <span
        @click="addChildTask(task.id)"
        class="absolute inset-y-0 right-0 flex w-1/5 cursor-pointer items-center justify-center rounded-r-lg border-b-2 border-r-2 border-t-2 border-secondary-green bg-secondary-green px-4 py-2 text-center text-primary-green duration-300 hover:bg-primary-green hover:text-secondary-green"
      >
        Add
      </span>
    </div>
    <div class="flex gap-2">
      <span
        @click="getParentTask(task)"
        class="rounded-md bg-secondary-red px-4 py-2 text-primary-red duration-300 hover:cursor-pointer hover:bg-primary-red hover:text-secondary-red"
        >Add Child</span
      >
      <span
        @click="getEditableTaskName(task)"
        class="rounded-md bg-secondary-red px-4 py-2 text-primary-red duration-300 hover:cursor-pointer hover:bg-primary-red hover:text-secondary-red"
        >Edit</span
      >
      <span
        @click="completeTask(task.id)"
        class="rounded-md bg-secondary-red px-4 py-2 text-primary-red duration-300 hover:cursor-pointer hover:bg-primary-red hover:text-secondary-red"
        >Done</span
      >
      <span
        @click="deleteTask(task.id)"
        class="rounded-md bg-secondary-red px-4 py-2 text-primary-red duration-300 hover:cursor-pointer hover:bg-primary-red hover:text-secondary-red"
        >Delete</span
      >
    </div>
  </div>
</template>
<script>
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase/init";
import { v4 as uuidv4 } from "uuid";
export default {
  props: {
    task: {
      required: true,
    },
  },
  data() {
    return {
      editableTaskId: "",
      editableTaskTitle: "",
      edit: false,
      parentTaskId: "",
      childTaskTitle: "",
      addChild: false,
    };
  },
  methods: {
    // edit the task name
    getEditableTaskName(task) {
      this.edit = !this.edit;
      this.editableTaskId = task.id;
      this.editableTaskTitle = task.title;
    },
    // toggle Child Task Input
    getParentTask(task) {
      this.addChild = !this.addChild;
      this.parentTaskId = task.id;
    },
    // add a child task
    addChildTask(taskId) {
      if (!this.childTaskTitle.length > 0) {
        return;
      }
      fetch("http://localhost:3000/tasks/" + taskId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          childTasks: [
            ...this.task.childTasks,
            {
              title: this.childTaskTitle,
              completed: false,
              id: uuidv4(),
            },
          ],
        }),
      })
        .then(() => {
          console.log("added a child task");
          this.addChild = !this.addChild;
          this.childTaskTitle = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // update the task name
    updateTaskName(taskId) {
      if (!this.editableTaskTitle.length > 0) {
        return;
      }
      fetch("http://localhost:3000/tasks/" + taskId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({
          title: this.editableTaskTitle,
        }),
      })
        .then(() => {
          console.log("updated");
          this.edit = !this.edit;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // delete the task
    async deleteTask(taskId) {
      await deleteDoc(doc(db, "tasks", taskId));
    },
    // complete the task
    completeTask(taskId) {
      fetch("http://localhost:3000/tasks/" + taskId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      })
        .then(() => {
          console.log("completed");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
