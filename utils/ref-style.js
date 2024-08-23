const refStyled = (listRef, ref) => {
  
  let refCalled = [];
  let refFtn = [];
  listRef.map((e, i) => {
    i++;
    for (let v of ref) {
      if (e.ftn == `-(footnote:${v.ID})-`) {
        refFtn.push(v);
        refCalled.push(v);
        refCalled.push(e);
      }
    }
  });


  let hsl = [];
  let count = 0;
  let aftrCkSmeRf = cekSameRef(listRef, refFtn, ref);

  aftrCkSmeRf.forEach((e, i) => {
    if (i % 2 == 0) {
      count++;
      hsl.push(footnoteStyle(e, count, e.type, aftrCkSmeRf[i + 1], i));
    }
  });
  let dfPstk = sortingRef(ref).map((e, i) => {
    return daftarPustakaStyle(e, i, e.type);
  });
  
  return { ftNt: `footnotes:{ ${hsl.join(",")}},`, dfPstk: dfPstk.join(",") };
};


// fungsi untuk membalik nama pada daftar pustaka
function pembalikNama(nama) {
  if (nama.includes(" ")) {
    nama = nama.split(" ");
    let selectNama = [];
    nama.forEach((e, i) => {
      if(e.toLowerCase() == "dkk"){
        if(nama[i-1] != "dan") {
          selectNama.push(nama[i-1]);
        }else if(nama[i-1] == "dan"){
          selectNama.push(nama[i-2]);
        }
      };
    });

    selectNama = selectNama.join("");
    let hslNama = "";
    if(nama.includes("dan")){
      console.log("ok ndan")
      nama = nama.join(" ").replace(" " + selectNama, "")
      hslNama = selectNama.replaceAll(",", "") + ", " + nama;
    };
    if(!nama.includes("dan")){
      console.log("ndk ndan")
      nama = nama.join(" ").replace(" " + selectNama, ",")
      hslNama = selectNama.replaceAll(",", "") + ". " + nama;
    };
    return hslNama;
  } else {
    return nama;
  }
}

function sortingRef(data) {
  data = data.map((e, i) => {
    e.Penulis = pembalikNama(e.Penulis);
    return e;
  });
  data.sort((a, b) =>
    a.Penulis.toLowerCase().localeCompare(b.Penulis.toLowerCase())
  );
  return data;
}

function cekSameRef(listRef, refCalled, ref) {
  let idxRef = {};
  
  for (let i = 1; i <= ref.length; i++) {
    idxRef["idx" + i] = [];
    refCalled.forEach((e, ie) => {
      if (e.ID === i) {
        idxRef["idx" + i].push(ie);
      }
    });
  }

  
  let keyRefSame = [];
  refCalled.forEach((e, i) => {
    if (e.ID) {
      let ftnCode = listRef[i];
      let idxPositionRef = idxRef["idx" + e.ID];
      for (let [idx, idxEl] of idxPositionRef.entries()) {
        if (i == idxEl) {
          keyRefSame.push(e);
          if (idx == 0) {
            keyRefSame.push({ tipe: "normal", newHal: "" });
          } else {
            if (idxEl - idxPositionRef[idx - 1] == 1) {
              if (ftnCode.hal) {
                keyRefSame.push({ tipe: "ibid", newHal: ftnCode.hal });
              } else {
                keyRefSame.push({ tipe: "ibid", newHal: "" });
              }
            } else {
              if (ftnCode.hal) {
                keyRefSame.push({ tipe: "opcit", newHal: ftnCode.hal });
              } else {
                keyRefSame.push({ tipe: "loccit", newHal: "" });
              }
            }
          }
        }
      }
    }
  });

  return keyRefSame;
}

// function cekSameRef(refCalled, ref) {
//   let idxRef = {};
//   let refCalledCode = [];
//   refCalled.forEach((e, i) => {
//     refCalledCode.push(refCalled[2*i-1]);
//   });

//   refCalled = refCalled.filter((e, i) => {
//     if (i % 2 == 0) {
//       return e;
//     }
//   });
  
//   for (let i = 1; i <= ref.length; i++) {
//     idxRef["idx" + i] = [];
//     refCalled.forEach((e, ie) => {
//       if (e.ID === i) {
//         idxRef["idx" + i].push(ie);
//       }
//     });
//   }

//   // console.log(refCalled);
//   // console.log(refCalledCode);
//   // console.log(idxRef);
//   let keyRefSame = [];
//   // DISINI ADA BUG: penempatan nomor halaman pada ibid tidak sesuai
//   refCalled.forEach((e, i) => {
//     if (e.ID) {
//       let ftnCode = refCalledCode[i];
//       let idxPositionRef = idxRef["idx" + e.ID];
//       for (let [idx, idxEl] of idxPositionRef.entries()) {
//         if (i == idxEl) {
//           keyRefSame.push(e);
//           if (idx == 0) {
//             keyRefSame.push({ tipe: "normal", newHal: "" });
//           } else {
//             if (idxEl - idxPositionRef[idx - 1] == 1) {
//               if (ftnCode.hal) {
//                 keyRefSame.push({ tipe: "ibid", newHal: ftnCode.hal });
//               } else {
//                 keyRefSame.push({ tipe: "ibid", newHal: "" });
//               }
//             } else {
//               if (ftnCode.hal) {
//                 keyRefSame.push({ tipe: "opcit", newHal: ftnCode.hal });
//               } else {
//                 keyRefSame.push({ tipe: "loccit", newHal: "" });
//               }
//             }
//           }
//         }
//       }
//     }
//   });
//   // console.log(keyRefSame.length);
//   return keyRefSame;
// }

function footnoteStyle(data, idx, type, recall, trueIdx) {

  // hanging: convertMillimetersToTwip(0),
  let indent = `indent: {
    firstLine: convertMillimetersToTwip(4.8),
    left: convertMillimetersToTwip(0),
  },`

  if (recall.tipe == "normal") {
    if (type == "jurnal") {
      return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, \\"${data.Judul}\\", ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                      new TextRun({
                        text: "${data.Nama}, ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                        italics: true,
                      }),
                      new TextRun({
                        text: "Vol. ${data.Volume}, No. ${data.Nomor} (${data.Tahun}), Hal. ${data.Halaman}.",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
    }
    if (type == "buku") {
      let tst = () => {
        if (data.Penterjemah.length != 0) {
          return { ok: `Terj. ${data.Penterjemah}, `, cek: true };
        } else {
          return false;
        }
      };
      return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                      new TextRun({
                        text: "${data.Judul}, ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                        italics: true,
                      }),
                      new TextRun({
                        text: "${tst().cek ? tst.ok : ""}(${data.Kota}: ${
        data.Penerbit
      }, ${data.Tahun}), Hal. ${data.Halaman}.",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
    }
    if (type == "tesis") {
      return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, ${data.Tipe}: \\"${data.Judul}\\" (${data.Kota}: ${data.Universitas}, ${data.Tahun}), Hal. ${data.Halaman}.",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
    }
    if (type == "website") {
      return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, \\"${data.Judul}\\" (${data.Link}, diakses tanggal ${data.Tanggal} pukul ${data.Waktu}).",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
    }
  }
  if (recall.tipe == "ibid") {
    return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Ibid.,",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                      new TextRun({
                        text: "${
                          recall.hal ? "Hal. " + recall.newHal : recall.newHal
                        }",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
  }
  if (recall.tipe == "opcit") {
    return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                      new TextRun({
                        text: "Op.Cit., ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                        italics: true,
                      }),
                      new TextRun({
                        text: "Hal. ${recall.newHal}.",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
  }
  if (recall.tipe == "loccit") {
    return `${idx}: {
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "${data.Penulis}, ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                      new TextRun({
                        text: "Loc.Cit., ",
                        size: 20,
                        color: "000000",
                        font: "Times New Roman",
                        italics: true,
                      }),
                    ],
                    ${indent}
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                      line: 240,
                    },
                  }),
                ],
              }`;
  }
}

function daftarPustakaStyle(data, idx, type) {
  // firstLine: convertMillimetersToTwip(4.8),
  let indent = `indent: {
    hanging: convertMillimetersToTwip(9.3),
    left: convertMillimetersToTwip(9.8),
  },`
  if (type == "jurnal") {
    return `
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "${data.Penulis}. ${data.Tahun}. \\"${data.Judul}\\". ",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                    new TextRun({
                      text: "${data.Nama}, ",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                      italics: true,
                    }),
                    new TextRun({
                      text: "Vol. ${data.Volume}, No. ${data.Nomor}.",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                  ],
                  ${indent}
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                  },
                })`;
  }
  if (type == "buku") {
    let penterjemah = () => {
      if (data.Penterjemah.length != 0) {
        return { ok: `Terj. ${data.Penterjemah}. `, cek: true };
      } else {
        return false;
      }
    };
    return ` 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "${data.Penulis}. ${data.Tahun}. ",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                    new TextRun({
                      text: "${data.Judul}. ",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                      italics: true,
                    }),
                    new TextRun({
                      text: "${penterjemah().cek ? penterjemah.ok : ""} ${
      data.Kota
    }: ${data.Penerbit}.",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                  ],
                  ${indent}
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                  },
                })`;
  }
  if (type == "tesis") {
    return ` 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "${data.Penulis}. ${data.Tahun}. ${data.Tipe}: \\"${data.Judul}\\". ${data.Kota}: ${data.Universitas}.",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                  ],
                  ${indent}
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                  },
                })`;
  }
  if (type == "website") {
    return ` 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "${data.Penulis}. ${data.Tahun}. \\"${data.Judul}\\" (${data.Link}, diakses tanggal ${data.Tanggal} pukul ${data.Waktu}).",
                      size: 24,
                      color: "000000",
                      font: "Times New Roman",
                    }),
                  ],
                  ${indent}
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                  },
                })`;
  }
}

module.exports = refStyled;