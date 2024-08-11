const clearPoint = require("./clearPoint");
const cekNmr = require("./data_tipe_teks");
const { pointStyle, teksStyle } = require("./inner-docx");
const { mainManageRef, extractTxt } = require("./ref-manage");
const refStyled = require("./ref-style");
const { runDocx } = require("./run");
const spclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\t]/;

// code runner
const mentahanData = async (data) => {
  // data = JSON.parse(data);
  teks = data.teks;
  ref = data.ref;

  if (spclChar.test(data.teks) && /[a-zA-Z\d]/.test(data.teks)) {
    // kelola data text input
    const lineTeks = filterEnter(teks);
    const arrInArr = bagianTeks(lineTeks);
    const arrHuruf = filterSpasi(arrInArr);
    const objCkNmr = cekNomor(arrHuruf);
    let grPnt = groupPoint(arrInArr, objCkNmr);
    if (ref) {
      // kelola data input referensi
      let mergeRefAndTxt = mainManageRef(ref, grPnt);
      grPnt = mergeRefAndTxt.txt;
      listRef = refStyled(mergeRefAndTxt.ttlFtNt, ref);
    } else {
      listRef = { ftNt: "", dfPstk: "" };
      grPnt = extractTxt(grPnt);
    }
    // membuat file
    const teksStyled = getTextStyle(grPnt, pointStyle, teksStyle);
    try{
      // console.log(listRef.ftNt)
      let docxBuffer = await runDocx(teksStyled.join(","), listRef);
      console.log(docxBuffer)
      return docxBuffer;
    }catch(error){
      throw error;
    };
  }
  // return;
};

// fungsi memisahkan kalimat berdasrkan enter
function filterEnter(teks) {
  const arrWord = [...teks];
  const arrKos = [];
  let dummyArr = [];
  arrWord.forEach((e, i) => {
    dummyArr.push(e);
    if (e == "\n") {
      arrKos.push(dummyArr.join("").replaceAll("\u0002", "-"));
      dummyArr = [];
    }
    if (i == arrWord.length - 1) {
      if (e != "\n") {
        arrKos.push(dummyArr.join("").replaceAll("\u0002", "-") + "\n");
        arrKos.push("\n");
      } else {
        arrKos.push(dummyArr.join("").replaceAll("\u0002", "-"));
      }

      dummyArr = [];
    }
  });
  return arrKos;
}

// memishkan bagian teks berdasarkan element "\n"
function bagianTeks(arrInpt) {
  let dummyArr = [];
  let arrKos = [];
  arrInpt.forEach((e, i) => {
    if (e == "\n" || i == arrInpt.length - 1) {
      if (dummyArr.length != 0) {
        arrKos.push(dummyArr);
      }
      dummyArr = [];
    } else {
      dummyArr.push(e);
    }
  });
  return arrKos;
}

// membuat dan pemberian tag
// fungsi memisahkan kalimat berdasrkan spasi
const filterSpasi = (arrKal) => {
  let arr = [];
  arrKal.forEach((e, i) => {
    e = e.join("");
    let kal = [...e];
    let arrKos = [];
    let dummyArr = [];
    kal.forEach((a, idx) => {
      if (spclChar.test(a) || idx == kal.length - 1) {
        arrKos.push(dummyArr.join(""));
        arrKos.push(a);
        dummyArr = [];
      } else {
        dummyArr.push(a);
      }
    });
    if (!arrKos.length == 0 && !arrKos == false) {
      arr.push(arrKos);
    }
  });
  return arr;
};

// memeriksa penomoran untuk batas teks
function cekNomor(arrInpt) {
  let arrKos = [];
  let cekPoint = 0;
  arrInpt.forEach((e, i) => {
    let hsl = cekNmr(e);
    hsl.index = i;
    if (hsl.cekNmr) {
      cekPoint = i;
      hsl.arrMark = cekPoint;
    }
    if (!hsl.cekNmr) {
      hsl.arrMark = cekPoint;
    }
    arrKos.push(hsl);
  });
  return arrKos;
}

// memisahkan batas teks berdasarkan nomor dan dijadikan ke dalam array
function groupPoint(arrTeks, btsPnt) {
  let nilaiLoop = btsPnt[btsPnt.length - 1].arrMark;
  let arrObj = [];
  
  let count1 = 10;
  let count2 = 10;
  let count3 = 10;
  let count4 = 10;
  let count5 = 10;

  for (let i = 0; i <= nilaiLoop; i++) {
    let tskDt = btsPnt[i];
    let obj = {};
    obj.id_tingkat = null;
    obj.id_instance = null;
    obj.point = [];
    obj.teks = [];

    if (tskDt.cekNmr) {
      obj.id_tingkat = tskDt.tingkat.toString();
      if (tskDt.tingkat == "1") {
        let currentIdx = count1;
        if (tskDt.tipe == "A.") {
          count1 += 1;
          obj.id_instance = count1.toString();
        } else {
          obj.id_instance = currentIdx.toString();
        }
      } else if (tskDt.tingkat == "2") {
        let currentIdx = count2;
        if (tskDt.tipe == "1.") {
          count2 += 1;
          obj.id_instance = count2.toString();
        } else {
          obj.id_instance = currentIdx.toString();
        }
      } else if (tskDt.tingkat == "3") {
        let currentIdx = count3;
        if (tskDt.tipe == "a.") {
          count3 += 1;
          obj.id_instance = count3.toString();
        } else {
          obj.id_instance = currentIdx.toString();
        }
      } else if (tskDt.tingkat == "4") {
        let currentIdx = count4;
        if (tskDt.tipe == "1)") {
          count4 += 1;
          obj.id_instance = count4.toString();
        } else {
          obj.id_instance = currentIdx.toString();
        }
      } else if (tskDt.tingkat == "5") {
        let currentIdx = count5;
        if (tskDt.tipe == "a)") {
          count5 += 1;
          obj.id_instance = count5.toString();
        } else {
          obj.id_instance = currentIdx.toString();
        }
      }
    } else if (!tskDt.cekNmr && tskDt.index == 0) {
      obj.id_tingkat = "0";
    }

    arrTeks.forEach((e, idx) => {
      if (btsPnt[idx].arrMark == i && btsPnt[idx].cekNmr) {
        obj.point.push(e.join("").replaceAll("\n", "").replaceAll('"', '\\"'));
      } else if (btsPnt[idx].arrMark == i && !btsPnt[idx].cekNmr) {
        obj.teks.push(e.join("").replaceAll("\n", "").replaceAll('"', '\\"'));
      }
    });
    if (obj.id_tingkat != null) {
      arrObj.push(obj);
    }
  }
  return arrObj;
}

// penggabungan data dengan style teks
function getTextStyle(teksDt, pntStyle, tksStyle) {
  teksDt = clearPoint(teksDt);
  let arrKos = [];
  let count = 0;
  let ftntCode = "+?=ftnt!TR*_+";
  let tempStyle = (txt, ftNt) => {
    return {
      txt: `new TextRun({
              text: "${txt}",
              size: 24,
              color: "000000",
              font: "Times New Roman",
            })`,
      ftNt: `new FootnoteReferenceRun(${ftNt})`,
    };
  };

  teksDt.forEach((e) => {
    if (e.cekIdRef) {
      let cekPoint = false;
      let cekTeks = false;
      if (e.point.length != 0) {
        cekPoint = true;
      }
      if (e.teks.length != 0) {
        cekTeks = true;
      }
      for (let i = 0; i <= pntStyle().length; i++) {
        if (e.id_tingkat == i) {
          if (e.id_tingkat == 0) {
            e.teks.forEach((a) => {
              let arrStyl = [];
              a.forEach((c) => {
                if (c == ftntCode) {
                  count += 1;
                  arrStyl.push(tempStyle(c).txt);
                  arrStyl.push(`new FootnoteReferenceRun(${count})`);
                } else {
                  arrStyl.push(tempStyle(c).txt);
                }
              });
              arrKos.push(pntStyle(`[${arrStyl}]`)[i].style);
            });
          } else {
            if (cekPoint) {
              let arrStyl = [];
              e.point.forEach((a) => {
                if (a == ftntCode) {
                  count += 1;
                  a = a.replace(ftntCode, "");
                  arrStyl.push(tempStyle(a).txt);
                  arrStyl.push(`new FootnoteReferenceRun(${count})`);
                } else {
                  arrStyl.push(tempStyle(a).txt);
                }
              });
              arrKos.push(pntStyle(`[${arrStyl}]`, e.id_instance)[i].style);
            }
            if (cekTeks) {
              e.teks.forEach((a) => {
                let arrStyl = [];
                a.forEach((c) => {
                  if (c == ftntCode) {
                    count += 1;
                    c = c.replace(ftntCode, "");
                    arrStyl.push(tempStyle(c).txt);
                    arrStyl.push(`new FootnoteReferenceRun(${count})`);
                  } else {
                    arrStyl.push(tempStyle(c).txt);
                  }
                });
                arrKos.push(
                  tksStyle(`[${arrStyl}]`, pntStyle()[i].leftValue).style
                );
              });
            }
          }
        }
      }
    } else {
      let cekPoint = false;
      let cekTeks = false;
      if (e.point.length != 0) {
        cekPoint = true;
      }
      if (e.teks.length != 0) {
        cekTeks = true;
      }
      for (let i = 0; i <= pntStyle().length; i++) {
        if (e.id_tingkat == i) {
          if (e.id_tingkat == 0) {
            e.teks.forEach((a) => {
              arrKos.push(pntStyle(`[${tempStyle(a).txt}]`)[i].style);
            });
          } else {
            if (cekPoint) {
              e.point.forEach((a) => {
                // console.log(pntStyle(`[${tempStyle(a).txt}]`, e.id_instance)[i].style)
                arrKos.push(
                  pntStyle(`[${tempStyle(a).txt}]`, e.id_instance)[i].style
                );
              });
            }
            if (cekTeks) {
              e.teks.forEach((a) => {
                arrKos.push(
                  tksStyle(`[${tempStyle(a).txt}]`, pntStyle()[i].leftValue)
                    .style
                );
              });
            }
          }
        }
      }
    }
  });
  return arrKos;
}

module.exports = mentahanData;
