<template>
	<div class="bg-slate-100 shadow-md p-10 rounded-md">
		<h1>Type your tasks here</h1>
		<div>
			<div>
				<input type="text" v-model="newTask" @keyup.enter="addTask" />
				<span @click="addTask" class="text-primary-green">Add</span>
			</div>
		</div>
		<div>
			<h2>Tasks in db:</h2>
			<ul>
				<li v-for="task in tasks">
					{{ task.title }}
					<span @click="deleteTask(task.id)" class="text-primary-red"
						>Delete</span
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
					body: JSON.stringify({ title: this.newTask, id: uuidv4() }),
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
