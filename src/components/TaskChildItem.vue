<template>
  <div class="mt-4 w-5/6 self-end">
    <span @click="showChildTasks = !showChildTasks">Show Child Tasks</span>
    <ul v-if="showChildTasks">
      <li
        v-for="childTask in task.childTasks"
        class="my-4 flex items-center justify-between rounded-lg bg-secondary-red px-2 py-4 shadow-sm"
      >
        <span>
          {{ childTask.title }}
        </span>
        <div>
          <span>delete</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      required: true,
    },
  },
  data() {
    return {
      showChildTasks: false,
    };
  },
};
</script>
