let express = require("express");
let router = express.Router();
const mentahanData = require("./../utils/pusat_pengolah_data");
const spclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\t]/;

let app = express();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SHORTCUT-DOCX", hello: "hello world" });
});

// api
// router.get("/home/api", async function (req, res, next) {
//   const hslData = await mentahanDataDb.find();
//   res.send(hslData);
// });

router.get("/home", (req, res) => {
  res.render("home", {
    title: "SHORTCUT-DOCX",
  });
});

function calculateDataSize(data) {
  const jsonString = JSON.stringify(data);
  const byteSize = new TextEncoder().encode(jsonString).length;
  console.log(`Size of data: ${byteSize} bytes`);
  return byteSize;
}

router.post("/home", async function (req, res) {
  let data = req.body.data;
  // let dataSize = calculateDataSize(data)
  if (data.teks.length > 70) {
    if (spclChar.test(data.teks) && /[a-zA-Z\d]/.test(data.teks)) {
      try {
        let docxBuffer = await mentahanData(data);
        res.set({
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": "attachment; filename=Makalah.docx",
        });
        return res.send(docxBuffer);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error processing data");
      }
    } else {
      return res.redirect("/home");
    }
  } else {
    return res.redirect("/home");
  }
});

// router.get("/about", async function (req, res) {
//   res.render("about", {
//     title: "SHORTCUT-DOCX",
//   });

router.get("/referensi", async function (req, res) {
  res.render("referensi", {
    title: "SHORTCUT-DOCX",
  });
});

module.exports = router;
