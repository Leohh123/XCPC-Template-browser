<template>
    <div class="settings">
        <el-col :span="6" :offset="9" style="margin-top: 30px">
            <el-form>
                <el-form-item label="User ID">
                    <el-input v-model="user.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Old password">
                    <el-input
                        type="password"
                        v-model="user.oldPasswd"
                    ></el-input>
                </el-form-item>
                <el-form-item label="New password">
                    <el-input
                        type="password"
                        v-model="user.newPasswd"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Confirm new password">
                    <el-input
                        type="password"
                        v-model="user.confirmNewPasswd"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" @click="update">
                    Update password
                </el-button>
            </el-form>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Settings",
    data() {
        return {
            user: {
                name: this.$u.currentUser(),
                oldPasswd: "",
                newPasswd: "",
                confirmNewPasswd: ""
            }
        };
    },
    methods: {
        update() {
            if (this.user.newPasswd === this.user.confirmNewPasswd) {
                this.axios
                    .post(this.$u.api("/auth/setpasswd"), {
                        old: this.user.oldPasswd,
                        new: this.user.newPasswd
                    })
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
            } else {
                this.$message.error(
                    "Password confirmation doesn't match the password"
                );
            }
        }
    }
};
</script>
