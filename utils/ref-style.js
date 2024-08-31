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

function identifikasiNama(inpt) {
  const spclChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\t]/;
  let arrNama = inpt.split(" ");
  let identObj = {
    type: null,
    afterSpace: null,
    jamak: null,
  };

  if (arrNama.length == 1) {
    identObj.type = "short";
    identObj.afterSpace = false;
    identObj.jamak = false;
  } else {
    if (spclChar.test(inpt)) {
      let spclWord = arrNama.find((e) => e.match(spclChar));
      let wordSprai = [...spclWord];
      let wordSatatus = false;
      wordSprai.forEach((e, i) => {
        if (!spclChar.test(e)) {
          wordSatatus = true;
        }
      });
      if (wordSatatus) {
        if (arrNama.includes("dkk") || arrNama.includes("dan")) {
          identObj.type = "long";
          identObj.afterSpace = true;
          identObj.jamak = [
            arrNama.find((e) => e == "dkk" || e == "dan"),
            arrNama.findIndex((e) => e == "dkk" || e == "dan"),
          ];
        } else if (!arrNama.includes("dan")) {
          identObj.type = "mid";
          identObj.afterSpace = true;
          identObj.jamak = false;
        }
      } else if (!wordSatatus) {
        identObj.afterSpace = false;
        identObj.jamak = false;
      }
    } else {
      let identChar = inpt.charAt(inpt.indexOf(" ") + 1);
      if (identChar == "") {
        identObj.type = "short";
        identObj.afterSpace = true;
        identObj.jamak = false;
      } else {
        if (arrNama.includes("dkk") || arrNama.includes("dan")) {
          identObj.type = "long";
          identObj.afterSpace = true;
          identObj.jamak = [
            arrNama.find((e) => e == "dkk" || e == "dan"),
            arrNama.findIndex((e) => e == "dkk" || e == "dan"),
          ];
        } else if (!arrNama.includes("dan")) {
          identObj.type = "mid";
          identObj.afterSpace = true;
          identObj.jamak = false;
        }
      }
    }
  }
  return identObj;
}

// fungsi untuk membalik nama pada daftar pustaka
function pembalikNama(nama) {
  let identNama = identifikasiNama(nama);
  let placeNama;
  if (identNama.type == "long") {
    nama = nama.split(" ");
    let hslNama = "";
    if (identNama.jamak[0] == "dkk") {
      let selectNama = [];
      nama.forEach((e, i) => {
        if (e.toLowerCase() == "dkk") {
          if (nama[i - 1] != "dan") {
            selectNama.push(nama[i - 1]);
          } else if (nama[i - 1] == "dan") {
            selectNama.push(nama[i - 2]);
          }
        }
      });

      selectNama = selectNama.join("");
      if (nama.includes("dan")) {
        nama = nama.join(" ").replace(" " + selectNama, "");
        hslNama = selectNama.replaceAll(",", "") + ", " + nama;
      }
      if (!nama.includes("dan")) {
        if (nama[0] == nama[identNama.jamak[1] - 1]) {
          return nama.join(" ");
        } else {
          nama = nama.join(" ").replace(" " + selectNama, ",");
          hslNama = selectNama.replaceAll(",", "") + ", " + nama;
        }
      }
    } else if (identNama.jamak[0] == "dan") {
      if (nama[0] == nama[identNama.jamak[1] - 1]) {
        return nama.join(" ");
      } else {
        placeNama = nama
          .join(" ")
          .replace(" " + nama[identNama.jamak[1] - 1], "");
        hslNama =
          nama[identNama.jamak[1] - 1].replaceAll(",", "") + ", " + placeNama;
      }
    }
    return hslNama;
  } else if (identNama.type == "mid") {
    nama = nama.split(" ");
    if (nama[nama.length - 1] == "") {
      nama.pop();
      placeNama = nama.pop();
      return `${placeNama}, ${nama}`;
    } else {
      placeNama = nama.pop();
      return `${placeNama}, ${nama}`;
    }
  } else if (identNama.type == "short") {
    return nama;
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
  },`;

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
      let terjemah = "";
      if (data.Penterjemah.length != 0) {
        terjemah = `Terj. ${data.Penterjemah}, `;
      } else {
        terjemah = "";
      }
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
                        text: "${terjemah}(${data.Kota}: ${data.Penerbit}, ${data.Tahun}), Hal. ${data.Halaman}.",
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
  },`;
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
    let terjemah = "";
    if (data.Penterjemah.length != 0) {
      terjemah = `Terj. ${data.Penterjemah}. `;
    } else {
      terjemah = "";
    }
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
                      text: "${terjemah} ${
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
