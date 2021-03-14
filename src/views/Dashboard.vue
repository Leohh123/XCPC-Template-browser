<template>
    <div class="dashboard">
        <el-col :span="7" class="col-dashboard">
            <el-tree
                class="tree-dashboard"
                :data="layout"
                :props="{
                    children: 'items',
                    label: 'name'
                }"
                node-key="id"
                :default-expand-all="true"
                :render-content="renderContent"
            >
            </el-tree>
        </el-col>
        <el-col :span="10" class="col-dashboard">
            <el-form
                class="form-dashboard form-dashboard-top"
                :model="form.item"
                :inline="true"
            >
                <el-form-item>
                    <el-input
                        type="text"
                        placeholder="Name"
                        v-model="form.item.add.name"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Parent ID"
                        v-model="form.item.add.src"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addItem">
                        Add item
                    </el-button>
                </el-form-item>
            </el-form>
            <el-form class="form-dashboard" :model="form.item" :inline="true">
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Item ID"
                        v-model="form.item.delete.id"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="deleteItem">
                        Delete item
                    </el-button>
                </el-form-item>
            </el-form>
            <el-form class="form-dashboard" :model="form.link" :inline="true">
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Parent ID"
                        v-model="form.link.add.src"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Child ID"
                        v-model="form.link.add.dst"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addLink">
                        Add link
                    </el-button>
                </el-form-item>
            </el-form>
            <el-form class="form-dashboard" :model="form.link" :inline="true">
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Parent ID"
                        v-model="form.link.delete.src"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Child ID"
                        v-model="form.link.delete.dst"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="deleteLink">
                        Delete link
                    </el-button>
                </el-form-item>
            </el-form>
            <el-form class="form-dashboard" :model="form.link" :inline="true">
                <el-form-item>
                    <el-input
                        type="number"
                        placeholder="Parent ID"
                        v-model="form.link.arrange.src"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="text"
                        placeholder="Sequence of item ID"
                        v-model="form.link.arrange.ids"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="arrange">
                        Arrange
                    </el-button>
                </el-form-item>
            </el-form>
            <el-form class="form-dashboard" :inline="true">
                <el-form-item>
                    <el-button @click="updateLayout">
                        Update and refresh
                    </el-button>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-form class="form-dashboard">
                <el-form-item>
                    <el-input type="textarea" :rows="3" v-model="latexContent">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="exportLatex">
                        Export as Latex
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="7" class="col-dashboard">
            <el-card class="card-dashboard" header="Back edges">
                {{ error.back_edges }}
            </el-card>
            <el-card class="card-dashboard" header="Ignored">
                {{ error.ignored }}
            </el-card>
            <el-card class="card-dashboard" header="Isolated">
                {{ error.isolated }}
            </el-card>
        </el-col>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            layout: [],
            error: {
                back_edges: "Loading",
                ignored: "Loading",
                isolated: "Loading"
            },
            form: {
                item: {
                    add: {
                        name: "",
                        src: null
                    },
                    delete: {
                        id: null
                    }
                },
                link: {
                    add: {
                        src: null,
                        dst: null
                    },
                    delete: {
                        src: null,
                        dst: null
                    },
                    arrange: {
                        src: null,
                        ids: ""
                    }
                }
            },
            latexContent: ""
        };
    },
    methods: {
        renderContent(h, { node, data, store }) {
            return (
                <span class="tree-span">
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span style="margin-right: 6px">{`[${data.id}]`}</span>
                </span>
            );
        },
        request(title, url, data, method = "post") {
            var dataString = JSON.stringify(data);
            const h = this.$createElement;
            (method === "post" ? this.axios.post : this.axios.get)(
                url,
                data
            ).then(resp => {
                this.$notify({
                    title: title,
                    type: resp.data.code === 0 ? "success" : "error",
                    message: h("div", [
                        h("p", resp.data.message),
                        h("p", { style: "color: grey" }, dataString)
                    ])
                });
            });
        },
        addItem() {
            this.request(
                "Add item",
                this.$u.api("/item/add"),
                this.form.item.add
            );
        },
        deleteItem() {
            this.request(
                "Delete item",
                this.$u.api("/item/delete"),
                this.form.item.delete
            );
        },
        addLink() {
            this.request(
                "Add link",
                this.$u.api("/link/add"),
                this.form.link.add
            );
        },
        deleteLink() {
            this.request(
                "Delete link",
                this.$u.api("/link/delete"),
                this.form.link.delete
            );
        },
        arrange() {
            var data = [];
            try {
                var ids = JSON.parse(`[${this.form.link.arrange.ids}]`);
                var src = parseInt(this.form.link.arrange.src);
                for (var dst of ids) {
                    if (typeof dst !== "number") {
                        throw new Error();
                    }
                    data.push([src, dst]);
                }
                this.request("Arrange", this.$u.api("/link/arrange"), {
                    links: JSON.stringify(data)
                });
            } catch (err) {
                this.$error("Syntax error");
            }
        },
        updateLayout() {
            this.axios.get(this.$u.api("/layout/update")).then(resp => {
                if (resp.data.code === 0) {
                    this.$router.go(0);
                }
            });
        },
        exportLatex() {
            this.axios.get(this.$u.api("/export/latex")).then(resp => {
                if (resp.data.code === 0) {
                    this.latexContent = resp.data.data;
                    this.$message({
                        message: resp.data.message,
                        type: "success"
                    });
                } else {
                    this.$error(resp.data.message);
                }
            });
        }
    },
    mounted() {
        this.axios.get(this.$u.api("/layout/data")).then(resp => {
            this.layout = resp.data.data;
        });
        this.axios.get(this.$u.api("/layout/error")).then(resp => {
            this.error = resp.data.data;
        });
    }
};
</script>

<style scoped>
.col-dashboard:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.5);
}
.tree-dashboard {
    width: 100%;
}
.form-dashboard {
    padding: 0px 6px;
}
.form-dashboard h3 {
    margin-bottom: 0px;
}
.form-dashboard-top {
    margin-top: 6px;
}
.full {
    width: 100%;
}
.card-dashboard {
    margin: 6px;
}
</style>
