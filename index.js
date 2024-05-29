const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();

app.use(cors());

app.listen(4000, () => {
  console.log("Server Works!!! At port 4000");
});

app.get("/download", async (req, res) => {
  var URL = req.query.URL;
  var format = req.query.format;

  if (format === "mp3") {
    res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
    ytdl(URL, { filter: "audioonly" }).pipe(res);
  } else if (format === "mp4") {
    res.header("Content-Disposition", `attachment; filename="video.mp4"`);

    // Fetch the best format that contains both audio and video
    const info = await ytdl.getInfo(URL);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

    if (format.hasVideo && format.hasAudio) {
      ytdl(URL, { format }).pipe(res);
    } else {
      // Handle the case where the format does not have both audio and video
      res
        .status(400)
        .send("The requested format does not contain both audio and video");
    }
  }
});
