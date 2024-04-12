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
          <TaskItem :task="task" />
          <TaskChildItem :task="task" />
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
          <CompletedTaskItem :task="task"></CompletedTaskItem>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import db from "./firebase/init";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import TaskItem from "./components/TaskItem.vue";
import TaskChildItem from "./components/TaskChildItem.vue";

import CompletedTaskItem from "./components/CompletedTaskItem.vue";

import ButtonWrapper from "./components/ui/ButtonsWrapper.vue";
import Button from "./components/ui/Button.vue";

export default {
  components: {
    TaskItem,
    TaskChildItem,
    CompletedTaskItem,
    ButtonWrapper,
    Button,
  },
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    // get the tasks from the firebase database
    getTasks() {
      onSnapshot(collection(db, "tasks"), (querySnapshot) => {
        let fbTasks = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed,
            childTasks: doc.data().childTasks,
          };
          fbTasks.push(task);
        });
        this.tasks = fbTasks;
      });
    },
    // add the default task
    async addTask() {
      // if input is empty, return
      if (this.newTask === "") return;
      // add the task to the firebase database
      await addDoc(collection(db, "tasks"), {
        title: this.newTask,
        completed: false,
        childTasks: [],
      });
      // clear the input
      this.newTask = "";
    },
    // undo the task
    async undoTask(taskId) {
      try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
          completed: false,
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
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
};
</script>
