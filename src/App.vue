<template>
  <div class="flex flex-col gap-6 rounded-md bg-slate-200 p-10 shadow-md">
    <h1 class="py-4 text-center text-2xl">Type your tasks here</h1>
    <div class="relative inline-block w-full">
      <input
        class="w-4/5 rounded-l-lg border-b-2 border-l-2 border-t-2 border-secondary-green px-4 py-2 outline-none"
        type="text"
        minlength="3"
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <span
        @click="addTask"
        class="absolute inset-y-0 right-0 flex w-1/5 cursor-pointer items-center justify-center rounded-r-lg border-b-2 border-r-2 border-t-2 border-secondary-green bg-secondary-green px-4 py-2 text-center text-primary-green duration-300 hover:bg-primary-green hover:text-secondary-green"
      >
        Add
      </span>
    </div>
    <div>
      <h2 class="text-lg">Current Tasks</h2>
      <ul>
        <li
          v-for="task in currentTasks"
          :key="task.id"
          class="my-4 flex flex-col items-center rounded-lg bg-white px-2 py-4 shadow-sm"
        >
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
            <div class="flex gap-2">
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
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-lg">Completed Tasks</h2>
      <ul>
        <li
          v-for="task in completedTasks"
          class="my-4 flex items-center justify-between rounded-lg bg-slate-300 px-2 py-4 shadow-sm"
        >
          <span class="line-through">
            {{ task.title }}
          </span>
          <span
            @click="undoTask(task.id)"
            class="rounded-md bg-secondary-red px-4 py-2 text-primary-red duration-300 hover:cursor-pointer hover:bg-primary-red hover:text-secondary-red"
            >Undo</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      newTask: "",
      tasks: [],
      editableTaskId: "",
      editableTaskTitle: "",
      edit: false,
    };
  },
  methods: {
    // get the tasks from the json server
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // add the default task
    addTask() {
      // if input is empty, return
      if (this.newTask === "") return;
      // else send post request to store the task
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.newTask,
          completed: false,
          id: uuidv4(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.newTask = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // edit the task name
    getEditableTaskName(task) {
      this.edit = !this.edit;
      this.editableTaskId = task.id;
      this.editableTaskTitle = task.title;
    },
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
    deleteTask(taskId) {
      console.log(taskId);
      fetch("http://localhost:3000/tasks/" + taskId, {
        method: "DELETE",
      })
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
    // undo the task
    undoTask(taskId) {
      fetch("http://localhost:3000/tasks/" + taskId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: false,
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
  computed: {
    // filter current tasks
    currentTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    // filter completed tasks
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  // when app is mounted, get the tasks
  mounted() {
    this.getTasks();
  },
  // when app is updated, get the tasks
  updated() {
    this.getTasks();
  },
};
</script>
