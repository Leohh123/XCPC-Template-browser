<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        :default-active="$u.currentPath(this)"
    >
        <el-menu-item index="/">
            XCPC Template
        </el-menu-item>
        <el-menu-item
            v-for="(item, idx) in $cfg.NAV_ITEMS"
            :key="idx"
            :index="`/item/${item.id}`"
        >
            {{ item.name }}
        </el-menu-item>
        <template v-if="$u.currentUser() !== null">
            <el-submenu class="right" index="user-dropdown">
                <template slot="title">{{ $u.currentUser() }}</template>
                <el-menu-item index="/settings">
                    Settings
                </el-menu-item>
                <el-menu-item @click="logout">
                    Logout
                </el-menu-item>
            </el-submenu>
            <el-menu-item class="right" index="/posts">
                Posts
            </el-menu-item>
            <el-menu-item class="right" index="/dashboard">
                Dashboard
            </el-menu-item>
        </template>
        <template v-else>
            <el-menu-item class="right" index="/register">
                Register
            </el-menu-item>
            <el-menu-item class="right" index="/login">
                Login
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {};
    },
    methods: {
        logout() {
            this.axios.get(this.$u.api("/auth/logout")).then(resp => {
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

<style scoped>
.right {
    float: right;
}
.el-col:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.5);
}
</style>
