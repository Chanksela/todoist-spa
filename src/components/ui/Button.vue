<template>
  <span
    class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary-red duration-300 hover:cursor-pointer"
  >
    <slot></slot
  ></span>
</template>
<script>
export default {
  name: "Button",
};
</script>
