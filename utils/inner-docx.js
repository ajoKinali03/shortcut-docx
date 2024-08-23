const pointStyle = (point, numRestart) => {
  let arrLeftValue = [0.2, 5, 10, 15, 20, 25];
  return [
    {
      id: "0",
      leftValue: arrLeftValue[0],
      style: `new Paragraph({
        children: ${point},
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          firstLine: convertMillimetersToTwip(9.8),
          left: convertMillimetersToTwip(${arrLeftValue[0]}),
        },
      }),`
    },
    {
      id: "1",
      leftValue: arrLeftValue[1],
      style: `new Paragraph({
        children: ${point},
        style: "bold",
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          hanging: convertMillimetersToTwip(4.8),
          firstLine: convertMillimetersToTwip(0),
          left: convertMillimetersToTwip(${arrLeftValue[1]}),
        },
        numbering: {
          reference: "num0",
          instance: ${numRestart},
          level: 0,
        },
      }),`,
    },
    {
      id: "2",
      leftValue: arrLeftValue[2],
      style: `new Paragraph({
        children: ${point},
        style: "normal",
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          hanging: convertMillimetersToTwip(4.9),
          firstLine: convertMillimetersToTwip(4.9),
          left: convertMillimetersToTwip(${arrLeftValue[2]}),
        },
        numbering: {
          reference: "num1",
          instance: ${numRestart},
          level: 0,
        },
      }),`,
    },
    {
      id: "3",
      leftValue: arrLeftValue[3],
      style: `new Paragraph({
        children: ${point},
        style: "normal",
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          hanging: convertMillimetersToTwip(5),
          firstLine: convertMillimetersToTwip(5),
          left: convertMillimetersToTwip(${arrLeftValue[3]}),
        },
        numbering: {
          reference: "num2",
          instance: ${numRestart},
          level: 0,
        },
      }),`,
    },
    {
      id: "4",
      leftValue: arrLeftValue[4],
      style: `new Paragraph({
        children: ${point},
        style: "normal",
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          hanging: convertMillimetersToTwip(5),
          firstLine: convertMillimetersToTwip(5),
          left: convertMillimetersToTwip(${arrLeftValue[4]}),
        },
        numbering: {
          reference: "num3",
          instance: ${numRestart},
          level: 0,
        },
      }),`,
    },
    {
      id: "5",
      leftValue: arrLeftValue[5],
      style: `new Paragraph({
        children: ${point},
        style: "normal",
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: 360,
        },
        indent: {
          hanging: convertMillimetersToTwip(5),
          firstLine: convertMillimetersToTwip(5),
          left: convertMillimetersToTwip(${arrLeftValue[5]}),
        },
        numbering: {
          reference: "num4",
          instance: ${numRestart},
          level: 0,
        },
      }),`,
    },
  ];
};

let teksStyle = (text, indentLeftValue) => {
  return {
    style: `new Paragraph({
      children: ${text},
      alignment: AlignmentType.JUSTIFIED,
      spacing: {
        line: 360,
      },
      indent: {
        firstLine: convertMillimetersToTwip(9.8),
        left: convertMillimetersToTwip(${indentLeftValue}),
      },
    }),`,
  };
};


// {
//   id: "jb",
//   style: `new Paragraph({
//     children: [
//       new TextRun({
//         text: "${text}",
//         bold: true,
//         size: 24,
//         color: "000000",
//         allCaps: true,
//         font: "Times New Roman",
//       }),
//     ],
//     alignment: AlignmentType.CENTER,
//     spacing: {
//       line: 360,
//     },
//     indent: {
//       left: 1,
//       hanging: 0,
//       firstLine: 0,
//     },
//   }),`,
// },
// ,
//       new Paragraph({
//           children: [
//             new TextRun({
//               text: "${text}",
//               size: 36,
//               color: "000000",
//               font: "Traditional Arabic",
//             }),
//           ],
//           alignment: AlignmentType.RIGHT,
//           spacing: {
//             line: 360,
//           },
//           indent: {
//             firstLine: convertMillimetersToTwip(12),
//             left: convertMillimetersToTwip(1),
//           },
//         }),
//         new TextRun({
//           text: '"${text}"',
//           size: 24,
//           italics: true,
//           color: "000000",
//           font: "Times New Roman",
//         }),
//         ],
//         alignment: AlignmentType.JUSTIFIED,
//         spacing: {
//           line: 240,
//         },
//         indent: {
//           // firstLine: convertMillimetersToTwip(12),
//           left: convertMillimetersToTwip(1),
//         },
//       }),

module.exports = { pointStyle, teksStyle };
