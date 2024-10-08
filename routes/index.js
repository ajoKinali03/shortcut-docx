let express = require("express");
let router = express.Router();
const mentahanData = require("./../utils/pusat_pengolah_data");
const validator = require("validator");
const spclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\t]/;

let app = express();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SHORTCUT-DOCX", hello: "hello world" });
});

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
  if (validator.isByteLength(data.teks, { min: 70, max: undefined })) {
    if (
      spclChar.test(data.teks) &&
      /[a-zA-Z\d]/.test(data.teks) &&
      validator.isJSON(JSON.stringify(data.ref))
    ) {
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

router.get("/referensi", async function (req, res) {
  res.render("referensi", {
    title: "SHORTCUT-DOCX",
  });
});

router.get("/tutorial", async function (req, res) {
  res.render("tutorial", {
    title: "SHORTCUT-DOCX",
  });
});

router.get("/kebijakan-privasi", async function (req, res) {
  res.render("kebijakan-privasi", {
    title: "SHORTCUT-DOCX",
  });
});

router.get("/tentang-kami", async function (req, res) {
  res.render("tentang-kami", {
    title: "SHORTCUT-DOCX",
  });
});

module.exports = router;
