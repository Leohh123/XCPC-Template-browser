<template>
    <div class="home">
        <div class="search">
            <h1>XCPC Template</h1>
            <el-autocomplete
                style="width: 100%"
                placeholder="Search"
                v-model="keyword"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            keyword: ""
        };
    },
    methods: {
        querySearch(queryString, cb) {
            console.log(queryString);
            this.axios
                .get(this.$u.api("/item/search"), {
                    params: {
                        keyword: queryString
                    }
                })
                .then(resp => {
                    cb(resp.data.data);
                });
        },
        handleSelect(item) {
            this.$router.push({ name: "Item", params: { id: item.id } });
        }
    }
};
</script>

<style scoped>
.home {
    height: 60vh;
    position: relative;
}
.search {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
.search h1 {
    font-weight: lighter;
    font-size: 60px;
}
</style>
