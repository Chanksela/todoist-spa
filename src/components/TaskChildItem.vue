<template>
  <div class="mt-4 w-5/6 self-end">
    <span @click="showChildTasks = !showChildTasks">Show Child Tasks</span>
    <ul v-if="showChildTasks">
      <li
        v-for="childTask in task.childTasks"
        class="my-4 flex items-center justify-between rounded-lg bg-secondary-red px-2 py-4 shadow-sm"
      >
        <span :class="{ 'line-through': childTask.completed }">
          {{ childTask.title }}
        </span>
        <ButtonsWrapper>
          <DoneIcon
            v-if="!childTask.completed"
            @click="completeChildTask(childTask.id)"
            class="h-[30px] w-[30px] rounded-full bg-secondary-red fill-primary-green p-1 duration-300 hover:cursor-pointer hover:bg-primary-green hover:fill-white" />
          <UndoIcon
            v-else
            @click="completeChildTask(childTask.id)"
            class="h-[30px] w-[30px] rounded-full bg-white stroke-primary-red p-1 duration-300 hover:cursor-pointer hover:bg-primary-red hover:stroke-white" />
          <EditIcon
            @click="deleteChildTask(childTask.id)"
            class="h-[30px] w-[30px] rounded-full bg-secondary-red fill-primary-green p-1 duration-300 hover:cursor-pointer hover:bg-primary-green hover:fill-white" />
          <DeleteIcon
            @click="deleteChildTask(childTask.id)"
            class="h-[30px] w-[30px] rounded-full bg-white stroke-primary-red p-1 duration-300 hover:cursor-pointer hover:bg-primary-red hover:stroke-white"
        /></ButtonsWrapper>
      </li>
    </ul>
  </div>
</template>
<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import deleteTask from "@/mixins/deleteTask";

import ButtonsWrapper from "./ui/ButtonsWrapper.vue";

import EditIcon from "../assets/svg/edit.svg";
import UndoIcon from "../assets/svg/undo.svg";
import DoneIcon from "../assets/svg/done.svg";
import DeleteIcon from "../assets/svg/delete.svg";

export default {
  props: {
    task: {
      required: true,
    },
  },
  mixins: [deleteTask],
  components: {
    ButtonsWrapper,
    EditIcon,
    UndoIcon,
    DoneIcon,
    DeleteIcon,
  },
  data() {
    return {
      done: false,
      showChildTasks: false,
    };
  },
  methods: {
    async deleteChildTask(childTaskId) {
      try {
        const taskRef = doc(db, "tasks", this.task.id);
        const childTaskSnapshot = await getDoc(taskRef);
        const childTaskData = childTaskSnapshot.data();
        console.log("childTaskData", childTaskData);
        if (childTaskData.childTasks) {
          // Iterate over the keys of childTasks
          for (const key in childTaskData.childTasks) {
            // If the id of the childTask matches the id of the childTask we want to delete
            if (childTaskData.childTasks[key].id === childTaskId) {
              delete childTaskData.childTasks[key];
              // Update the childTasks array in Firestore
              await updateDoc(taskRef, {
                childTasks: childTaskData.childTasks,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error deleting child task: ", error);
      }
    },
    async completeChildTask(childTaskId) {
      try {
        const taskRef = doc(db, "tasks", this.task.id);
        const childTaskSnapshot = await getDoc(taskRef);
        const childTaskData = childTaskSnapshot.data();
        console.log("childTaskData", childTaskData);
        if (childTaskData.childTasks) {
          // Iterate over the keys of childTasks
          for (const key in childTaskData.childTasks) {
            // If the id of the childTask matches the id of the childTask we want to delete
            if (childTaskData.childTasks[key].id === childTaskId) {
              childTaskData.childTasks[key].completed =
                !childTaskData.childTasks[key].completed;
              // Update the childTasks array in Firestore
              await updateDoc(taskRef, {
                childTasks: childTaskData.childTasks,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error deleting child task: ", error);
      }
    },
  },
};
</script>
