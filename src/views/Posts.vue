<template>
    <div class="posts">
        <el-col
            :span="16"
            :offset="4"
            style="margin-top: 30px; text-align: center"
        >
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 100, 500]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage"
            >
            </el-pagination>
            <el-collapse style="margin-top: 30px" v-model="posts">
                <el-collapse-item
                    v-for="(post, idx) in posts"
                    :key="idx"
                    :name="idx"
                >
                    <div slot="title" style="width: 100%">
                        <div style="float: left">{{ post.title }}</div>
                        <div class="div-id">[{{ post.id }}]</div>
                        <div class="div-time">
                            {{ new Date(post.time).toLocaleString() }}
                        </div>
                        <div class="div-author">
                            posted by {{ post.author }}
                        </div>
                    </div>
                    <div class="div-content">
                        <h3>Description</h3>
                        <pre>{{ post.description }}</pre>
                        <h3>Usage</h3>
                        <pre>{{ post.usage }}</pre>
                        <h3>Time</h3>
                        <pre>{{ post.complexity }}</pre>
                        <h3>Code</h3>
                        <pre>{{ post.code }}</pre>
                        <h3>Note</h3>
                        <pre>{{ post.note }}</pre>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Posts",
    data() {
        return {
            posts: [],
            pageSize: 10,
            currentPage: 1,
            totalPage: 0
        };
    },
    methods: {
        updatePosts() {
            this.axios.get(this.$u.api("/post/count")).then(resp => {
                this.totalPage = resp.data.data;
                this.axios
                    .get(this.$u.api("/post/query"), {
                        params: {
                            start: Math.max(
                                1,
                                this.totalPage -
                                    this.currentPage * this.pageSize +
                                    1
                            ),
                            end:
                                this.totalPage -
                                (this.currentPage - 1) * this.pageSize
                        }
                    })
                    .then(resp => {
                        if (resp.data.code === 0) {
                            resp.data.data.reverse();
                            this.posts = resp.data.data;
                        }
                    });
            });
        },
        handleSizeChange(value) {
            this.pageSize = value;
            this.updatePosts();
        },
        handleCurrentChange(value) {
            this.currentPage = value;
            this.updatePosts();
        }
    },
    mounted() {
        this.updatePosts();
    }
};
</script>
<style scoped>
.div-content {
    text-align: left;
}
.div-content h3 {
    margin-bottom: 0px;
}
.div-content pre {
    margin: 0px;
}
.div-id {
    float: right;
    margin-right: 10px;
}
.div-author {
    float: right;
    margin-right: 20px;
    color: grey;
}
.div-time {
    float: right;
    margin-right: 20px;
    color: grey;
}
</style>
