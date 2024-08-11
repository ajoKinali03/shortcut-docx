let runDocx = async (data, refData) => {
  const fs = require("fs");
  const {
    BorderStyle,
    Document,
    Packer,
    Paragraph,
    TextRun,
    Underline,
    UnderlineType,
    convertInchesToTwip,
    LevelFormat,
    AlignmentType,
    Header,
    Footer,
    Spacing,
    convertMillimetersToTwip,
    PageOrientation,
    PageSize,
    page,
    FootnoteReferenceRun,
    PageBreak,
    PageNumber,
    NumberFormat,
    SectionType,
    PageNumberSeparator,
    TabStopPosition,
    TabStopType,
    LeaderType,
  } = require("docx");
  const columnWidth = TabStopPosition.MAX / 4;

  try {
    let codeDoc = `new Document({
        compatibility: {
          doNotExpandShiftReturn: true,
        },
        styles: {
          paragraphStyles: [
            {
              id: "italic",
              name: "Italic",
              basedOn: "Normal",
              next: "Normal",
              run: {
                color: "000000",
                size: 24,
                font: "Times New Roman",
                italics: true,
              },
              paragraph: {
                  spacing: {
                      line: 360,
                  },
              },
            },
            {
              id: "bold",
              name: "Bold",
              basedOn: "Normal",
              next: "Normal",
              run: {
                color: "000000",
                size: 24,
                font: "Times New Roman",
                bold: true,
              },
              paragraph: {
                  spacing: {
                      line: 360,
                  },
              },
            },
            {
              id: "normal",
              name: "Normal",
              basedOn: "Normal",
              next: "Normal",
              run: {
                color: "000000",
                size: 24,
                font: "Times New Roman",
              },
              paragraph: {
                  spacing: {
                      line: 360,
                  },
              },
            },
          ],
        },
        numbering: {
          config: [
            {
              reference: "num0",
              levels: [
                {
                  level: 0,
                  text: "%1.",
                  format: LevelFormat.UPPER_LETTER,
                  alignment: AlignmentType.LEFT,
                },
              ],
            },
            {
              reference: "num1",
              levels: [
                {
                  level: 0,
                  text: "%1.",
                  format: LevelFormat.DECIMAL,
                  alignment: AlignmentType.LEFT,
                },
              ],
            },
            {
              reference: "num2",
              levels: [
                {
                  level: 0,
                  text: "%1.",
                  format: LevelFormat.LOWER_LETTER,
                  alignment: AlignmentType.LEFT,
                  indent: {
                    hanging: convertMillimetersToTwip(6),
                    left: convertMillimetersToTwip(6),
                  },
                },
              ],
            },
            {
              reference: "num3",
              levels: [
                {
                  level: 0,
                  text: "%1)",
                  format: LevelFormat.DECIMAL,
                  alignment: AlignmentType.LEFT,
                  indent: {
                    hanging: convertMillimetersToTwip(6),
                    left: convertMillimetersToTwip(6),
                  },
                },
              ],
            },
            {
              reference: "num4",
              levels: [
                {
                  level: 0,
                  text: "%1)",
                  format: LevelFormat.LOWER_LETTER,
                  alignment: AlignmentType.LEFT,
                  indent: {
                    hanging: convertMillimetersToTwip(6),
                    left: convertMillimetersToTwip(6),
                  },
                },
              ],
            },
          ],
        },

        ${refData.ftNt}

        sections: [
          {
            properties: {
              page: {
                size: {
                  orientation: PageOrientation.PORTRAIT,
                  width: convertMillimetersToTwip(210),
                  height: convertMillimetersToTwip(297),
                },
                margin: {
                  top: convertMillimetersToTwip(40),
                  right: convertMillimetersToTwip(30),
                  bottom: convertMillimetersToTwip(30),
                  left: convertMillimetersToTwip(40),
                },
              },
            },
            children: [
              new Paragraph({
                text: "MAKALAH",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "INI JUDUL",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Diajukan Untuk Memenuhi Tugas Mata Kuliah ......",
                style: "italic",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "lOGO",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Disusun Oleh:",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "........",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "UnknowChar\t000000",
                style: "normal",
                alignment: AlignmentType.CENTER,
                indent: {
                  hanging: convertMillimetersToTwip(40),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(40),
                },
              }),
              new Paragraph({
                text: "UnknowChar\t000000",
                style: "normal",
                alignment: AlignmentType.CENTER,
                indent: {
                  hanging: convertMillimetersToTwip(40),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(40),
                },
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Dosen Pengampu:",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: ".......",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "PROGRAM STUDI .........................",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "FAKULTAS .........................",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "UNIVERSITAS .........................",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "T.A 0000M/0000H",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
            ],
          },
          {
            properties: {
              page: {
                pageNumbers: {
                  start: 1,
                  formatType: NumberFormat.LOWER_ROMAN,
                  separator: PageNumberSeparator.EM_DASH,
                },
                size: {
                  orientation: PageOrientation.PORTRAIT,
                  width: convertMillimetersToTwip(210),
                  height: convertMillimetersToTwip(297),
                },
                margin: {
                  top: convertMillimetersToTwip(40),
                  right: convertMillimetersToTwip(30),
                  bottom: convertMillimetersToTwip(30),
                  left: convertMillimetersToTwip(40),
                },
              },
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                        size: 22,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                text: "KATA PENGANTAR",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Puji syukur kita panjatkan atas kehadiran Allah Swt, karena atas limpahan rahmat dan karunia-Nya sehingga penulis dapat menyelesaikan makalah tugas Akhlak Tasawuf ini dengan baik. Penulisan ini dapat tersusun berkat bantuan dari berbagai banyak pihak, penulis membuat makalah ini dengan mengangkat judul \“...........\” yang akan dipaparkan pada makalah ini. Untuk itu penulis mengucapkan terimakasih banyak kepada ........... selaku dosen pengampu yang telah membantu penulis dalam menyelesaikan tugas makalah ini. Tentu saja penulisan makalah ini tidak terlepas dari berbagai kekurangan dan juga kesalahan dari segi penulisan ataupun kesalahan dari kami sebagai penulis, untuk itu segala kritik dan saran yang membangun dari pembaca sangat di butuhkan, agar makalah selanjutnya bias lebih sempurna. Serta segala kritik dan saran dan masukan dari berbagai pihak menulis terima dengan senang hati. Semoga penulisan dari tugas makalah ini bermanfaat dan menambah wawasan bagi penulis dan pembaca.",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                indent: {
                  firstLine: convertMillimetersToTwip(10),
                  left: convertMillimetersToTwip(0.5),
                },
              }),
              new Paragraph({
                text: "DAFTAR ISI",
                style: "bold",
                pageBreakBefore: true,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "KATA PENGANTAR\ti",
                style: "bold",
                alignment: AlignmentType.LEFT,
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "DAFTAR ISI\tii",
                style: "bold",
                alignment: AlignmentType.LEFT,
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "BAB I PENDAHULUAN",
                style: "bold",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "Latar Belakang\t1",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 1,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "Rumusan Masalah\t1",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 1,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "BAB II PEMBAHASAN",
                style: "bold",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "Sub Judul_1\t0",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 2,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "Sub Judul_2\t0",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 2,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "Sub Judul_3\t0",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 2,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "BAB III PENUTUP",
                style: "bold",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "Kesimpulan\t0",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 3,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "Saran\t0",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(5),
                  firstLine: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(15),
                },
                numbering: {
                  reference: "num0",
                  instance: 3,
                  level: 0,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: convertMillimetersToTwip(138),
                    leader: LeaderType.DOT,
                  },
                ],
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "DAFTAR PSUTAKA",
                style: "bold",
                alignment: AlignmentType.LEFT,
              }),
            ],
          },
          {
            properties: {
              page: {

                pageNumbers: {
                  start: 1,
                  formatType: NumberFormat.DECIMAL,
                  separator: PageNumberSeparator.EM_DASH,
                },

                size: {
                  orientation: PageOrientation.PORTRAIT,
                  width: convertMillimetersToTwip(210),
                  height: convertMillimetersToTwip(297),
                },
                margin: {
                  top: convertMillimetersToTwip(40),
                  right: convertMillimetersToTwip(30),
                  bottom: convertMillimetersToTwip(30),
                  left: convertMillimetersToTwip(40),
                },
              },
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                        size: 22,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                text: "BAB I",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "PENDAHULUAN",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                type: "normal",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Latar Belakang",
                style: "bold",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.8),
                  firstLine: convertMillimetersToTwip(0),
                  left: convertMillimetersToTwip(5),
                },
                numbering: {
                  reference: "num0",
                  instance: 0,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet vehicula urna, in elementum erat vestibulum in. Phasellus faucibus arcu ac lacus vestibulum, nec tristique felis ultrices. Aliquam erat volutpat. Suspendisse potenti. Morbi commodo, nisi nec auctor ullamcorper, justo sapien pretium quam, a varius felis quam sed orci. Fusce dictum, justo vitae sodales cursus, neque magna vestibulum enim, et fermentum nisi purus et felis. Donec in nisl at libero consequat tincidunt. Sed fermentum lacinia libero, ac ultricies dolor mollis in. Nunc at ultricies orci. Integer sollicitudin velit ut sem auctor, et accumsan leo finibus. Mauris malesuada metus ac turpis ultricies, et tristique magna facilisis. Vivamus elementum purus ut eros consequat, sit amet vehicula odio scelerisque. Nullam in quam auctor, faucibus lorem id, iaculis velit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                indent: {
                  firstLine: convertMillimetersToTwip(9.8),
                  left: convertMillimetersToTwip(5),
                },
              }),
              new Paragraph({
                text: "Rumusan Masalah",
                style: "bold",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.8),
                  firstLine: convertMillimetersToTwip(0),
                  left: convertMillimetersToTwip(5),
                },
                numbering: {
                  reference: "num0",
                  instance: 0,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "................",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.9),
                  firstLine: convertMillimetersToTwip(4.9),
                  left: convertMillimetersToTwip(10),
                },
                numbering: {
                  reference: "num1",
                  instance: 0,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "Tujuan Penulisan",
                style: "bold",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.8),
                  firstLine: convertMillimetersToTwip(0),
                  left: convertMillimetersToTwip(5),
                },
                numbering: {
                  reference: "num0",
                  instance: 0,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "................",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.9),
                  firstLine: convertMillimetersToTwip(4.9),
                  left: convertMillimetersToTwip(10),
                },
                numbering: {
                  reference: "num1",
                  instance: 1,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "BAB II",
                style: "bold",
                pageBreakBefore: true,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "PEMBAHASAN",
                style: "bold",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
                style: "normal",
                alignment: AlignmentType.CENTER,
              }),
              ${data}
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                    size: 24,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
              }),
              new Paragraph({
                text: "BAB III",
                style: "bold",
                pageBreakBefore: true,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "PENUTUP",
                    size: 24,
                    color: "000000",
                    bold: true,
                    font: "Times New Roman",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "",
                    size: 24,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
              }),
              new Paragraph({
                text: "Kesimpulan",
                style: "bold",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.8),
                  firstLine: convertMillimetersToTwip(0),
                  left: convertMillimetersToTwip(5),
                },
                numbering: {
                  reference: "num0",
                  instance: -2,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet vehicula urna, in elementum erat vestibulum in. Phasellus faucibus arcu ac lacus vestibulum, nec tristique felis ultrices. Aliquam erat volutpat. Suspendisse potenti. Morbi commodo, nisi nec auctor ullamcorper, justo sapien pretium quam, a varius felis quam sed orci. Fusce dictum, justo vitae sodales cursus, neque magna vestibulum enim, et fermentum nisi purus et felis. Donec in nisl at libero consequat tincidunt. Sed fermentum lacinia libero, ac ultricies dolor mollis in. Nunc at ultricies orci. Integer sollicitudin velit ut sem auctor, et accumsan leo finibus. Mauris malesuada metus ac turpis ultricies, et tristique magna facilisis. Vivamus elementum purus ut eros consequat, sit amet vehicula odio scelerisque. Nullam in quam auctor, faucibus lorem id, iaculis velit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                indent: {
                  firstLine: convertMillimetersToTwip(9.8),
                  left: convertMillimetersToTwip(5),
                },
              }),
              new Paragraph({
                text: "Saran",
                style: "bold",
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                },
                indent: {
                  hanging: convertMillimetersToTwip(4.8),
                  firstLine: convertMillimetersToTwip(0),
                  left: convertMillimetersToTwip(5),
                },
                numbering: {
                  reference: "num0",
                  instance: -2,
                  level: 0,
                },
              }),
              new Paragraph({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet vehicula urna, in elementum erat vestibulum in. Phasellus faucibus arcu ac lacus vestibulum, nec tristique felis ultrices. Aliquam erat volutpat. Suspendisse potenti. Morbi commodo, nisi nec auctor ullamcorper, justo sapien pretium quam, a varius felis quam sed orci. Fusce dictum, justo vitae sodales cursus, neque magna vestibulum enim, et fermentum nisi purus et felis. Donec in nisl at libero consequat tincidunt.",
                style: "normal",
                alignment: AlignmentType.JUSTIFIED,
                indent: {
                  firstLine: convertMillimetersToTwip(9.8),
                  left: convertMillimetersToTwip(5),
                },
              }),
            ],
          },
          {
            properties: {
              page: {
                pageNumbers: {
                  separator: PageNumberSeparator.EM_DASH,
                },
                size: {
                  orientation: PageOrientation.PORTRAIT,
                  width: convertMillimetersToTwip(210),
                  height: convertMillimetersToTwip(297),
                },
                margin: {
                  top: convertMillimetersToTwip(40),
                  right: convertMillimetersToTwip(30),
                  bottom: convertMillimetersToTwip(30),
                  left: convertMillimetersToTwip(40),
                },
              },
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({}),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "DAFTAR PUSTAKA",
                    size: 24,
                    color: "000000",
                    bold: true,
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                    size: 24,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              ${refData.dfPstk}
            ],
          },
        ],
      });
      `;
    let doc = eval(codeDoc);
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error) {
    throw error;
  }

  // Packer.toBuffer(doc).then((buffer) => {
  //   fs.writeFileSync("./doc/My Document.docx", buffer);
  // });
};

module.exports = { runDocx };
