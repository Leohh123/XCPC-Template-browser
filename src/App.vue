<template>
    <el-container class="app">
        <Navbar />
        <router-view />
        <el-footer>
            <Footer />
        </el-footer>
    </el-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
    components: {
        Navbar,
        Footer
    }
};
</script>

<style>
body {
    margin: 0;
}
.el-header {
    padding: 0px;
}
.tree-span {
    font-size: 14px;
    width: 100%;
}
.tree-link {
    text-decoration: none;
    color: #606266;
}
.tree-link:hover {
    color: #409eff;
}
.tree-link-current {
    font-weight: 700;
}
</style>
