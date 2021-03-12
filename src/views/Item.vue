<template>
    <div class="item">
        <el-col :span="4">
            <el-tree
                :data="tree"
                :props="{
                    children: 'items',
                    label: 'name'
                }"
                node-key="id"
                :default-expanded-keys="expandedKeys"
                :render-content="renderContent"
            >
            </el-tree>
        </el-col>
        <el-col :span="16">
            <el-breadcrumb
                class="post-breadcrumb"
                separator-class="el-icon-arrow-right"
            >
                <el-breadcrumb-item
                    v-for="(item, idx) in path"
                    :key="idx"
                    :to="`/item/${item.id}`"
                >
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-form class="post-form" :model="post">
                <el-form-item>
                    <h3>Title</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.title"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <h3>Description</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.description"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <h3>Usage</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.usage"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <h3>Time</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.complexity"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <h3>Code</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.code"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <h3>Note</h3>
                    <el-input
                        type="textarea"
                        autosize
                        v-model="post.note"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveApply">
                        Save and apply
                    </el-button>
                    <el-button @click="save">
                        Save
                    </el-button>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item>
                    <h3>Label</h3>
                    <el-col :span="12">
                        <el-input v-model="status.label">
                            <el-button slot="append" @click="updateLabel">
                                Update
                            </el-button>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <h3>Status</h3>
                    <el-card>
                        <el-row>Author: {{ post.author }}</el-row>
                        <el-row
                            >Upload time:
                            {{ new Date(post.time).toLocaleString() }}
                        </el-row>
                        <el-row>Post ID: {{ post.id }}</el-row>
                        <el-row>
                            <el-checkbox v-model="status.display">
                                Display
                            </el-checkbox>
                            <el-button
                                @click="updateDisplay"
                                style="margin-left: 20px"
                                round
                            >
                                Update
                            </el-button>
                        </el-row>
                        <!-- <el-row>
                        </el-row> -->
                    </el-card>
                </el-form-item>
                <el-form-item>
                    <h3>Select the post</h3>
                    <el-col :span="12">
                        <el-input v-model="status.postId">
                            <el-button slot="append" @click="selectPost">
                                Apply
                            </el-button>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <h3>Add a subitem</h3>
                    <el-col :span="12">
                        <el-input v-model="status.subitemName">
                            <el-button slot="append" @click="addSubitem">
                                Add
                            </el-button>
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Item",
    data() {
        return {
            layout: [],
            tree: [],
            post: {
                title: "Loading...",
                description: "Loading...",
                usage: "Loading...",
                complexity: "Loading...",
                code: "Loading...",
                note: "Loading..."
            },
            expandedKeys: [],
            path: [],
            status: {
                postId: "",
                display: true,
                label: "",
                subitemName: ""
            }
        };
    },
    methods: {
        findItem(item, id, resPath) {
            if (item.id === id) {
                this.expandedKeys = [item.id];
                resPath.unshift(item);
                return true;
            }
            for (var it of item.items) {
                if (this.findItem(it, id, resPath)) {
                    resPath.unshift(item);
                    console.log(item.id);
                    return true;
                }
            }
            return false;
        },
        updateTree() {
            var curId = parseInt(this.$route.params.id);
            var resPath = [];
            for (var item of this.layout) {
                if (this.findItem(item, curId, resPath)) {
                    this.tree = item.items;
                    this.path = resPath;
                    return;
                }
            }
            this.tree = [];
            this.path = [{ name: "undefined", id: -1 }];
        },
        updateForm() {
            this.axios
                .post(this.$u.api("/item/query"), {
                    id: parseInt(this.$route.params.id)
                })
                .then(resp => {
                    if (resp.data.code === 0) {
                        this.post = resp.data.data.post;
                        this.status.display = resp.data.data.display;
                        this.status.name = resp.data.data.name;
                    }
                });
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="tree-span">
                    <router-link
                        class={
                            "tree-link" +
                            (data.id === parseInt(this.$route.params.id)
                                ? " tree-link-current"
                                : "")
                        }
                        to={`/item/${data.id}`}
                    >
                        {node.label}
                    </router-link>
                </span>
            );
        },
        save() {
            this.axios
                .post(this.$u.api("/post/add"), {
                    title: this.post.title,
                    description: this.post.description,
                    usage: this.post.usage,
                    complexity: this.post.complexity,
                    code: this.post.code,
                    note: this.post.note
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
        },
        saveApply() {
            this.axios
                .post(this.$u.api("/post/apply"), {
                    id: parseInt(this.$route.params.id),
                    title: this.post.title,
                    description: this.post.description,
                    usage: this.post.usage,
                    complexity: this.post.complexity,
                    code: this.post.code,
                    note: this.post.note
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
        },
        updateLabel() {
            this.axios
                .post(this.$u.api("/item/update"), {
                    id: parseInt(this.$route.params.id),
                    name: this.status.label
                })
                .then(resp => {
                    if (resp.data.code === 0) {
                        this.axios
                            .get(this.$u.api("/layout/update"))
                            .then(resp2 => {
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
                        this.$error(resp.data.message);
                    }
                });
        },
        selectPost() {
            this.axios
                .post(this.$u.api("/item/update"), {
                    id: parseInt(this.$route.params.id),
                    post_id: this.status.postId
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
        },
        updateDisplay() {
            this.axios
                .post(this.$u.api("/item/update"), {
                    id: parseInt(this.$route.params.id),
                    display: this.status.display
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
        },
        addSubitem() {
            this.axios
                .post(this.$u.api("/item/add"), {
                    name: this.status.subitemName,
                    src: parseInt(this.$route.params.id)
                })
                .then(resp => {
                    if (resp.data.code === 0) {
                        this.axios
                            .get(this.$u.api("/layout/update"))
                            .then(resp2 => {
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
                        this.$error(resp.data.message);
                    }
                });
        }
    },
    watch: {
        "$route.params.id"(from, to) {
            this.updateTree();
            this.updateForm();
        }
    },
    mounted() {
        this.axios.get(this.$u.api("/layout/data")).then(resp => {
            this.layout = resp.data.data;
            this.updateTree();
        });
        this.updateForm();
        console.log(this.$data);
    }
};
</script>

<style scoped>
.post-form h3 {
    margin-bottom: 0px;
}
.post-breadcrumb {
    padding: 12px 0px;
}
</style>
