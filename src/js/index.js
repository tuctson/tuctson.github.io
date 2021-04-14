import Vue from "vue";
import App from "./App.vue";
//import "../style/test.css";
new Vue({
  el: "#app",
  components: {
    //组件名
    App,
  },
  template: "<App/>",
});
saveHandler();
function saveHandler() {
  let data = {
    name: "hanmeimei",
    age: 88,
  };
  var content = JSON.stringify(data);
  var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  funDownload(blob, "./media/save.json");
  console.log("成功");
}

// 下载文件方法
function funDownload(content, filename) {
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}
