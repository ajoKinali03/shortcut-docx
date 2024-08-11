// code untuk otomatis merubah ukuran textarea
function addAutoResize() {
  document.querySelectorAll("[data-autoresize]").forEach(function (element) {
    element.style.boxSizing = "border-box";
    var offset = element.offsetHeight - element.clientHeight;
    element.addEventListener("input", function (event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + offset + "px";
    });
    element.removeAttribute("data-autoresize");
  });
}
addAutoResize()
// untuk menjalankan panggil fungsi addAutoResize() setalah pemanggilan DOM textarea tsb
// masukan attr data-autoresize di dalam kurang untuk mengetik atribut di jade
// masukan style box-sizing: border-box; dan resize: none; pada te araea dituju


