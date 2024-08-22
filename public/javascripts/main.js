import { saveData, deleteData, displayData } from "./client_save.js";

// const inputPost = document.getElementById("input-post");
// const cntrShwRefHome = document.getElementsByClassName("show-ref-home")[0];

const inpt = document.getElementById("form-input");
const formPost = document.getElementById("form-post");
const btnShwRef = document.getElementById("btn-showref");
const cntrCntn = document.getElementsByClassName("container-home")[0];
const btnPostText = document.getElementById("btn-post");
const tglBtn = document.getElementById("nav-tgl-btn");
const dropMenu = document.getElementsByClassName("drop-menu")[0];
const tglView = document.getElementsByClassName("tgl-view")[0];


tglBtn.addEventListener("click", () => {
  if (tglBtn.checked) {
    dropMenu.style.display = "flex";
    tglView.childNodes.item(0).style.display = "block";
  } else {
    tglView.childNodes.item(0).style.display = "none";
    dropMenu.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  let cekElementTarget = event.view.location.href.includes("home")
    ? event.target.attributes.id.nodeValue
    : false;
  if (cekElementTarget == "form-input") {
    deleteData(1)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    saveData(inpt.value, 1, "txt")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }
});

// menempatkan kembali teks yang tersimpan di indexedDB
displayData(1)
  .then((data) => {
    if (data) {
      inpt.value = data.txt;
    } else {
      console.log("Data tidak ditemukan atau kosong.");
    }
  })
  .catch((error) => {
    console.error(error);
  });

// auto set lebar atau responsif dari tampilan home
let lebarCntrCntn = document.getElementsByTagName("body").item(0).offsetWidth;
// .getBoundingClientRect().width;


if (lebarCntrCntn >= 1000) {
  inpt.style.width = `${parseInt(0.5 * lebarCntrCntn)}px`;
  formPost.style.width = `${parseInt(0.22 * lebarCntrCntn)}px`;
}
if (lebarCntrCntn <= 1039) {
  inpt.style.width = `${parseInt(0.99 * lebarCntrCntn)}px`;
  formPost.style.width = `${parseInt(0.99 * lebarCntrCntn)}px`;
}

// fungsi ketika tombol download ditekan
btnPostText.addEventListener("click", () => {
  displayData(1)
    .then((res1) => {
      displayData(2)
        .then((res2) => {
          let data = {
            teks: res1.txt,
            ref: res2.ref,
          };
          // akan mengirim data apabila teks ada isi nya
          if (res1.txt.length > 70) {
            displayData(3)
              .then((res3) => {
                let setuju = persetujuanPrivasi(res3);
                if (setuju) {

                  // siko wak validasi bagian client
                  downloadDocx(data);
                } else if (!setuju) {
                  alert(
                    "| Maaf kami tidak bisa mengolah data anda!.\n\n| Jika anda tidak setuju dengan kebijakan privasi kami, anda bisa hubungi kami melalui instagram untuk menyampaikan keluhan-nya."
                  );
                }
              })
              .catch((err) => err);
          } else {
            alert(
              "Harap isi prompt terlebih dahulu sebelum me-download makalah anda dan tolong diperhatikan untuk mengisi promt lebeh dari 10 KATA atau lebih dari 70 chracter"
            );
          }
        })
        .catch((err) => err);
    })
    .catch((err) => err);
});

async function downloadDocx(data) {
  const loadingElement = document.getElementById("loading");
  const loadingParentElement = document.getElementById("container-load");
  loadingElement.classList.add("active");
  loadingParentElement.classList.add("active-parent");

  try {
    const response = await fetch("/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then()
      .catch();

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Makalah.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.log(err);
  } finally {
    loadingElement.classList.remove("active");
    loadingParentElement.classList.remove("active-parent");
  }
}

// fungsi untuk menampilkan referensi yang tersimpan
btnShwRef.addEventListener("click", () => {
  displayData(2)
    .then((res) => {
      let data = res.ref;
      if (data.length > 0 && data[0] != null) {
        crtCntrShwRef(data, true);
      } else {
        crtCntrShwRef("Referensi Belum Anda Masukan", false);
      }
    })
    .catch((res) => res);
});

function crtCntrShwRef(respon, bool) {
  let listItemChild = cntrCntn.children.item(2);
  if (listItemChild.className == "none") {
    let shwRefHome = document.getElementsByClassName("none")[0];
    let attrClass = document.createAttribute("class");
    attrClass.value = "show-ref-home";
    shwRefHome.setAttributeNode(attrClass);

    if (lebarCntrCntn >= 1000) {
      shwRefHome.style.height = "85vh";
    }

    // auto set lebar dari tampilan cntr ref
    if (lebarCntrCntn >= 1000) {
      shwRefHome.style.width = `${parseInt(0.26 * lebarCntrCntn)}px`;
    }
    if (lebarCntrCntn <= 1039) {
      shwRefHome.style.width = `${parseInt(0.99 * lebarCntrCntn)}px`;
    }

    if (bool) {
      shwRefHome.style.textAlign = "";
      shwRefHome.style.color = "";
      shwRefHome.style.fontWeight = "";
      crtShowDtHome(respon, listItemChild);
    } else {
      // shwRefHome.style.textAlign = "center";
      // shwRefHome.style.color = "red";
      // shwRefHome.style.fontWeight = "bolder";
      shwRefHome.innerText = respon;
    }
  } else {
    let shwRefHome = document.getElementsByClassName("show-ref-home")[0];
    let attrClass = document.createAttribute("class");
    attrClass.value = "none";
    shwRefHome.setAttributeNode(attrClass);
    shwRefHome.innerText = "";
  }
}

function crtShowDtHome(data, cntrRefHome) {
  data.forEach((e, i) => {
    let showRefParent = document.createElement("div");
    let refClass = document.createAttribute("class");
    refClass.value = "ref-home";
    showRefParent.setAttributeNode(refClass);


    let showdFrag = document.createDocumentFragment();
    for (let key in e) {
      let shwTextP = document.createElement("p");
      let idKeyWordBtn = document.createAttribute("id");
      idKeyWordBtn.value = "keyword-btn";
      shwTextP.setAttributeNode(idKeyWordBtn);
      if (key == "ID") {
        shwTextP.innerText = `-(footnote:${e[key]})-`;
      } else {
        shwTextP.innerText = `${key}: ${e[key]}`;
      }
      showdFrag.appendChild(shwTextP);
    }
    showRefParent.appendChild(showdFrag);
    cntrRefHome.appendChild(showRefParent);
  });
}

// fitur menyalin keyword footnote
document.addEventListener("click", (event) => {
  let elementClick = event.target.innerText;
  let btnIdKeyWord = event.target.id;
  if (btnIdKeyWord == "keyword-btn") {
    navigator.clipboard
      .writeText(elementClick)
      .then(function () {
        console.log(elementClick);
        console.log("Teks berhasil disalin ke papan klip!");
      })
      .catch(function (err) {
        console.error("Gagal menyalin teks:", err);
      });
  }
});


const persetujuanPrivasi = (value) => {
  value = value ? value.setuju : false;
  if(value){
    return true;
  }else{
    let setuju = confirm("Apakah sudah membaca Kebijakan Privasi kami?\n\n Jika sudah silahkan tekan \"OKE\" untuk setuju dengan kebijakan privasi kami").valueOf()
    saveData(setuju, 3, "setuju");
    if(setuju){
      return setuju;
    }else{
      return setuju;
    }
  }
};