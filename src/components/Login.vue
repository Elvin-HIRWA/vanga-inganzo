<template>
    <div :id="modelID" class="modal centered-modal" role="dialog">
        <div class="modal-dialog login_dialog">
          <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal">
              <i class="fa_icon form_close"></i>
            </button>
            <div class="modal-body">
              <div class="ms_register_img">
                <img src="images/register_img.png" alt="" class="img-fluid" />
              </div>
              <div class="ms_register_form">
                <h2>login / Sign in</h2>
                <form>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      class="form-control"
                      v-model="email"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                      v-model="password"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div>
                    <a class="ms_btn" @click="submitForm">login now</a>
                  </div>
                </form>
                <div class="popup_forgot">
                  <a href="#">Forgot Password ?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import "vuejs-noty/dist/vuejs-noty.css";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  props:{
    modelID:{
        type: String,
        required: true
    }
  },
  methods: {
    async submitForm() {
      this.$Progress.start();
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");

      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post("/api/auth/signin", data);
        this.$Progress.finish();
        const token = response.data.token;
        const permissionName = response.data.permissionName;

        localStorage.setItem("token", token);
        localStorage.setItem("permissionName", permissionName);

        this.$store.commit("setToken", token);
        this.$store.commit("setPermissionName", permissionName);

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        const toPath = this.$route.query.to || "/";

        this.$router.push(toPath);
      } catch (error) {
        this.$Progress.fail();
        // if (error.response) {
        //   this.$noty.error(`${error.response.data.errors[0]}`);
        // } else {
        //   this.$noty.error("Something went wrong! Please try again");

        //   console.log(JSON.stringify(error));
        // }
      }
    },
  },
};
</script>

