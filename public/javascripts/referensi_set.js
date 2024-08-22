console.log("test")
// import { saveData, deleteData, displayData } from "./client_save.js";

let {saveData, deleteData, displayData} = require("./client_save");

// tahap melakukan penyimpanan dummy dan untuk menampilkan data yang tersimpan
displayData(2)
  .then((res) => {
    if (res) {
      res.ref.forEach((e, i) => {
        if (e != null) {
          crtShowDt(e);
        }
      });
    } else {
      saveData([null], 2, "ref");
    }
  })
  .catch((err) => err);

const cntrRefInpt = document.getElementsByClassName("container-input")[0];
const selectType = document.getElementById("tipe-ref");
const optType = document.getElementsByTagName("option");
const btnConfirmTxt = document.getElementById("btn-confirm-text");
const btnHapusSemua = document.getElementById("btn-hapus-semua");
const inptTxt = document.getElementsByClassName("inpt-txt");
const cntrRef = document.getElementsByClassName("container-ref")[0];

// fungsi membuat input yang selalu berganti sesui opsi yang diinginkan
const crtInptDt = (type) => {
  let arrInpt;
  if (type == "jurnal") {
    arrInpt = [
      "Judul",
      "Penulis",
      "Nama Jurnal",
      "Tahun",
      "Volume",
      "Nomor",
      "Halaman",
      // "ISBN",
    ];
  } else if (type == "buku") {
    arrInpt = [
      "Judul",
      "Penulis",
      "Kota Terbit",
      "Penerbit",
      "Tahun",
      "Halaman",
      // "Penterjemah",
      // "ISBN",
    ];
  } else if (type == "tesis") {
    arrInpt = [
      "Tipe EX: Tesis/Skripsi/Diseratsi",
      "Judul",
      "Penulis",
      "Kota",
      "Universitas",
      "Tahun",
      "Halaman",
    ];
  } else if (type == "website") {
    arrInpt = [
      "Judul",
      "Penulis",
      "Tahun",
      "Link Sumber",
      "Tanggal Lengkap Akses",
      "Waktu Akses",
    ];
  }

  let form = document.createElement("form");
  let classForm = document.createAttribute("class");
  classForm.value = "form-input";
  form.setAttributeNode(classForm);

  let inptdFrag = document.createDocumentFragment();

  arrInpt.forEach((e, i) => {
    let input = document.createElement("input");
    let namaInput = document.createAttribute("placeholder");
    if (e == "ISBN" || e == "Penterjemah") {
      namaInput.value = e + " (Opsional)";
    } else {
      namaInput.value = e;
    }
    let type = document.createAttribute("type");
    type.value = "text";
    let classInpt = document.createAttribute("class");
    classInpt.value = "inpt-txt";
    input.setAttributeNode(namaInput);
    input.setAttributeNode(type);
    input.setAttributeNode(classInpt);
    inptdFrag.appendChild(input);
  });
  form.appendChild(inptdFrag);
  cntrRefInpt.appendChild(form);
};

// penjalan fungsi crtInptDt
selectType.addEventListener("change", () => {
  const formInpt = document.getElementsByClassName("form-input")[0];
  let indukElement = formInpt.parentElement;
  indukElement.removeChild(formInpt);
  crtInptDt(selectType.value);
});

// fungsi untuk mengambil data text dari input
btnConfirmTxt.addEventListener("click", () => {
  // tahap penyimpanan data ke indexedDB
  displayData(2)
    .then((res) => {
      let objDataTxt = {};
      let cekDt = res.ref;

      if(cekDt[0] == null){
        // console.log(cekDt, "tst1")
        cekDt = [];
      }else{
        // console.log(cekDt, "tst2")
      }
      let idRef = 0 + cekDt.length;
      idRef++;
      objDataTxt.ID = idRef;
      objDataTxt.type = selectType.value;
      for (let i = 0; i < inptTxt.length; i++) {
        let e = inptTxt[i];
        objDataTxt[e.attributes.placeholder.value.split(" ")[0]] = e.value;
      }
      cekDt.push(objDataTxt);
      cekDt = cekDt.filter((e) => e);
      saveData(cekDt, 2, "ref");
      crtShowDt(objDataTxt);
    })
    .catch((err) => err);
});

// fungsi membuat tampilan show ref
function crtShowDt(data) {
  let showRefParent = document.createElement("div");
  let refClass = document.createAttribute("class");
  refClass.value = "show-ref";
  showRefParent.setAttributeNode(refClass);

  let showdFrag = document.createDocumentFragment();
  let dtArrKeys = Object.keys(data);

  for (let i = 0; i < dtArrKeys.length; i++) {
    let shwTextP = document.createElement("p");
    if (dtArrKeys[i] == "ID") {
      shwTextP.innerText = `${dtArrKeys[i]}:${data[dtArrKeys[i]]}`;
      shwTextP.style.display = "none";
    } else {
      shwTextP.innerText = `${dtArrKeys[i]}: ${data[dtArrKeys[i]]}`;
    }
    showdFrag.appendChild(shwTextP);
  }
  showRefParent.appendChild(showdFrag);

  let btnDel = document.createElement("button");
  let idBtnDel = document.createAttribute("id");
  idBtnDel.value = "ref-btn-del";
  btnDel.setAttributeNode(idBtnDel);
  btnDel.innerText = "HAPUS";
  showRefParent.appendChild(btnDel);

  cntrRef.appendChild(showRefParent);
}

// fungsi untuk menghapus data refrensi
document.addEventListener("click", (event) => {
  displayData(2)
    .then((res) => {
      res.ref = res.ref.filter((e) => e);
      let arrayChildren = event.target.parentElement.children;
      let triger = event.target;

      // terduga bug urutan id yang salah ada di sini

      // hapus data yang ditarget
      if (triger.id == "ref-btn-del") {
        for (let value of arrayChildren) {
          if (value.innerText.includes("ID:")) {
            let idElement = value.innerText.split(":")[1];
            let dataAfterDelete = res.ref.filter((e) => e.ID != idElement);
            // menyimpan kembali data yang baru
            dataAfterDelete = dataAfterDelete.map((e, i) => {
              e.ID = i+1;
              return e;
            })
            saveData(dataAfterDelete, 2, "ref");
            location.reload(true);
          }
        }
      }
    })
    .catch((err) => err);
});

// fungsi untuk menghapus semua data