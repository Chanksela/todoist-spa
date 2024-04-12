<template>
  <span class="line-through">
    {{ task.title }}
  </span>
  <ButtonWrapper>
    <Button
      @click="undoTask(task.id)"
      class="text-primary-green hover:bg-primary-green hover:text-secondary-green"
      >Undo</Button
    >
    <Button
      @click="deleteTask(task.id)"
      class="text-primary-red hover:bg-primary-red hover:text-secondary-red"
      >Delete
    </Button>
  </ButtonWrapper>
</template>
<script>
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase/init";

import ButtonWrapper from "./ui/ButtonsWrapper.vue";
import Button from "./ui/Button.vue";

import deleteTask from "../mixins/deleteTask";

export default {
  name: "CompletedTaskItem",
  components: {
    ButtonWrapper,
    Button,
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
