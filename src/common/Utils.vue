<script>
import Vue from "vue";
import Config from "./Config";

function api(path) {
    return Config.API_PATH + path;
}

function currentUser() {
    var res = Vue.$cookies.get("remember_token");
    return res ? res.split("|")[0] : null;
}

function currentPath(_this) {
    return _this.$router.history.current.path;
}

export default {
    api,
    currentUser,
    currentPath
};
</script>
