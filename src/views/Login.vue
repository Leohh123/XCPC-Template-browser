<template>
    <div class="login">
        <el-col :span="6" :offset="9" style="margin-top: 30px">
            <el-form>
                <el-form-item label="User ID">
                    <el-input v-model="loginData.name"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input
                        type="password"
                        v-model="loginData.passwd"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" @click="login">Login</el-button>
            </el-form>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginData: {
                name: "",
                passwd: ""
            }
        };
    },
    methods: {
        login() {
            this.axios
                .post(this.$u.api("/auth/login"), this.loginData)
                .then(resp => {
                    this.$alert(resp.data.message, {
                        confirmButtonText: "OK",
                        callback: action => {
                            if (resp.data.code === 0) {
                                this.$router.go(0);
                            }
                        }
                    });
                });
        }
    }
};
</script>
