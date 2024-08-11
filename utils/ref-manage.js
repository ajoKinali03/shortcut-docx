//
const regex = /-\(footnote:(\d+(?:,\d+(?:-\d+)?)?)\)-/g;

const mainManageRef = (refData, txtData) => {
  let temp = "-(footnote:";
  let data = txtData.map((eTxtDt, i) => {
    let cekId;
    let eTeks = eTxtDt.teks;
    let ePoint = eTxtDt.point;

    if (eTeks.length != 0) {
      eTxtDt.teks = eTeks.map((eT) => {
        return findAndSplit(eT);
      });
    }
    if (ePoint.length != 0) {
      eTxtDt.point = ePoint.map((eT) => {
        return findAndSplit(eT);
      });
    }
    

    if (
      eTxtDt.teks.join(" ").includes(temp) ||
      eTxtDt.point.join(" ").includes(temp)
    ) {
      if (eTxtDt.point.join(" ").includes(temp)) {
        eTxtDt.cekIdRef = "pnt";
      }
      if (eTxtDt.teks.join(" ").includes(temp)) {
        eTxtDt.cekIdRef = "txt";
      }
      if (
        eTxtDt.point.join(" ").includes(temp) &&
        eTxtDt.teks.join(" ").includes(temp)
      ) {
        eTxtDt.cekIdRef = "both";
      }
    } else if (
      !eTxtDt.teks.join(" ").includes(temp) &&
      !eTxtDt.point.join(" ").includes(temp)
    ) {
      eTxtDt.cekIdRef = false;
    }

    
    eTxtDt = cekHal(eTxtDt);
    // console.log(eTxtDt)
    return eTxtDt;
  });
  data = createObjTeksFootnote(refData, data);
  let arrCodeFtNt = data.ttlFtNt;
  data.ttlFtNt.forEach((e, i) => {
    i += 1
    // console.log(e, i);
  });
  // console.log(data)
  return data;
};

// Fungsi untuk mencari dan memisahkan kecocokan teks yang memiliki tanda footnote
function findAndSplit(input) {
  // const regex = /-\(footnote:(\d+)\)-/g;
  const matches = input.match(regex);

  if (matches) {
    const result = input.split(regex);

    for (let i = 1; i < result.length; i += 2) {
      result[i] = matches.shift();
    }
    return result;
  } else {
    // Jika tidak ada kecocokan, kembalikan array dengan string asli
    return [input];
  }
}

// fungsi untuk merubah nomor halaman
function cekHal(data) {
  if (data.point != undefined) {
    data.point = data.point.map((e, i) => {
      e = e.map((a) => {
        if (regex.test(a)) {
          if (a.includes(",")) {
            let halAndFtn = a.split(",");
            let ftn = halAndFtn[0] + ")-";
            let hal = halAndFtn[1].replace(")-", "");
            a = { ftn: ftn, hal: hal };
          } else {
            a = { ftn: a, hal: null };
          }
        }
        return a;
      });
      return e;
    });
  }
  if (data.teks != undefined) {
    data.teks = data.teks.map((e, i) => {
      e = e.map((a) => {
        if (regex.test(a)) {
          if (a.includes(",")) {
            let halAndFtn = a.split(",");
            let ftn = halAndFtn[0] + ")-";
            let hal = halAndFtn[1].replace(")-", "");
            a = { ftn: ftn, hal: hal };
          } else {
            a = { ftn: a, hal: null };
          }
        }
        return a;
      });
      return e;
    });
  }
  return data;
}

// fungsi untuk membuat objek teks dan footnote
function createObjTeksFootnote(ref, txt) {
  let ttlFootNote = [];
  txt = txt.map((e) => {
    let subArrTks;
    let subArrPnt;
    let arrTks = [];
    let arrPnt = [];
    if (e.cekIdRef) {
      if (e.cekIdRef == "txt") {
        // console.log(e.teks)
        e.teks.forEach((subEl, i) => {
          subArrTks = [];
          for (let [subIdx, a] of subEl.entries()) {
            if (typeof a == "object") {
              // for (let vT of a) {
              for (let vRef of ref) {
                let temp = `-(footnote:${vRef.ID})-`
                if (a.ftn == temp) {
                  ttlFootNote.push(a);
                  subArrTks.push("+?=ftnt!TR*_+");
                  // subArrTks.push(subEl[subIdx - 1]);
                }
              }
              // }
            } else {
              subArrTks.push(a);
            }
          }
          arrTks.push(subArrTks);
        });
        e.teks = arrTks;
      }
      if (e.cekIdRef == "pnt") {
        e.point.forEach((subEl, i) => {
          subArrPnt = [];
          for (let [subIdx, a] of subEl.entries()) {
            if (typeof a == "object") {
              // for (let vT of a) {
              for (let vRef of ref) {
                let temp = `-(footnote:${vRef.ID})-`;
                if (a.ftn == temp) {
                  ttlFootNote.push(a);
                  arrPnt.push("+?=ftnt!TR*_+");
                  // arrPnt.push(subEl[subIdx - 1]);
                }
              }
              // }
            } else {
              // console.log(a)
              arrPnt.push(a);
            }
          }
        });
        e.point = arrPnt;
      }
      if (e.cekIdRef == "both") {
        e.point.forEach((subEl, i) => {
          subArrPnt = [];
          for (let [subIdx, a] of subEl.entries()) {
            if (typeof a == "object") {
              // for (let vT of a) {
              for (let vRef of ref) {
                let temp = `-(footnote:${vRef.ID})-`;
                if (a.ftn == temp) {
                  ttlFootNote.push(a);
                  arrPnt.push("+?=ftnt!TR*_+");
                  // arrPnt.push(subEl[subIdx - 1]);
                }
              }
              // }
            } else {
              arrPnt.push(a);
            }
          }
        });
        e.point = arrPnt;

        e.teks.forEach((subEl, i) => {
          subArrTks = [];
          for (let [subIdx, a] of subEl.entries()) {
            if (typeof a == "object") {
              // for (let vT of a) {
              for (let vRef of ref) {
                let temp = `-(footnote:${vRef.ID})-`;
                if (a.ftn == temp) {
                  ttlFootNote.push(a);
                  subArrTks.push("+?=ftnt!TR*_+");
                  // subArrTks.push(subEl[subIdx - 1]);
                }
              }
              // }
            } else {
              subArrTks.push(a);
            }
          }
          arrTks.push(subArrTks);
        });
        e.teks = arrTks;
      }
    }
    return e;
  });
  // console.log(ttlFootNote);
  // console.log(JSON.stringify({ txt: txt, ttlFtNt: ttlFootNote }, null, 2))
  return { txt: txt, ttlFtNt: ttlFootNote };
}

const extractTxt = (txt) => {
  // let regex = /-\(footnote:(\d+)\)-/g;
  return txt.map((e) => {
    e.teks = e.teks.map((a) => {
      return a.replaceAll(regex, "");
    });
    e.point = e.point.map((a) => {
      return a.replaceAll(regex, "");
    });
    return e;
  });
};
module.exports = { mainManageRef, extractTxt };
