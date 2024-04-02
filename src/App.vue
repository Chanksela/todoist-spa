<template>
	<h1>Type your tasks here</h1>
	<div>
		<div><input type="text" /> <span @click="addTask">Add</span></div>
	</div>
	<div>
		<h2>Tasks in db:</h2>
		<ul>
			<li v-for="task in tasks">
				{{ task }}
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tasks: [],
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
				fetch("http://localhost:3000/tasks", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ task: "Default task", id: 111 }),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Success:", data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
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
