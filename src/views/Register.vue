<template>
    <div class="register">
        <el-col :span="6" :offset="9" style="margin-top: 30px">
            <el-form>
                <el-form-item label="User ID">
                    <el-input v-model="regData.name"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input
                        type="password"
                        v-model="regData.passwd"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Invitation code">
                    <el-input v-model="regData.ivcode"></el-input>
                </el-form-item>
                <el-button type="primary" @click="register">Register</el-button>
            </el-form>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            regData: {
                name: "",
                passwd: "",
                ivcode: ""
            }
        };
    },
    methods: {
        register() {
            this.axios
                .post(this.$u.api("/auth/register"), this.regData)
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
