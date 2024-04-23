<template>
  <span class="line-through">
    {{ task.title }}
  </span>
  <ButtonWrapper>
    <UndoIcon
      @click="undoTask(task.id)"
      class="h-[30px] w-[30px] rounded-full bg-secondary-red stroke-primary-green p-1 duration-300 hover:cursor-pointer hover:bg-primary-green hover:stroke-white"
    />
    <DeleteIcon
      @click="deleteTask(task.id)"
      class="h-[30px] w-[30px] rounded-full bg-secondary-red stroke-primary-red p-1 duration-300 hover:cursor-pointer hover:bg-primary-red hover:stroke-white"
    />
  </ButtonWrapper>
</template>
<script>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";

import deleteTask from "../mixins/deleteTask";

import ButtonWrapper from "./ui/ButtonsWrapper.vue";
import Button from "./ui/Button.vue";

import UndoIcon from "../assets/svg/undo.svg";
import DeleteIcon from "../assets/svg/delete.svg";

export default {
  name: "CompletedTaskItem",
  components: {
    ButtonWrapper,
    Button,
    UndoIcon,
    DeleteIcon,
  },
  mixins: [deleteTask],
  props: {
    task: {
      required: true,
    },
  },
  methods: {
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
};
</script>
