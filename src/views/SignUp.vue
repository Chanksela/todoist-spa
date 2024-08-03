<template>
  <div class="register">
    <form @submit.prevent="storeUser">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="userEmail" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="userPassword"
        />
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
    };
  },
  methods: {
    storeUser() {
      const auth = getAuth();
      const email = this.userEmail;
      const password = this.userPassword;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCreditentials) => {
          console.log("userCreditentials", userCreditentials);
          this.userEmail = "";
          this.userPassword = "";
        })
        .catch((error) => {
          this.userPassword = "";
          console.error("Error creating user: ", error);
        });
    },
  },
};
</script>
