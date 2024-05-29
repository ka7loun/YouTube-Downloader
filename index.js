require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Works!!! At port ${PORT}`);
});

app.get('/download', async (req, res) => {
    try {
        const URL = req.query.URL;
        const format = req.query.format;
        
        if (!URL || !format) {
            return res.status(400).send('URL and format are required');
        }

        if (format === 'mp3') {
            res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
            ytdl(URL, { filter: 'audioonly' }).pipe(res);
        } else if (format === 'mp4') {
            res.header('Content-Disposition', 'attachment; filename="video.mp4"');

            const info = await ytdl.getInfo(URL);
            const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });

            if (videoFormat.hasVideo && videoFormat.hasAudio) {
                ytdl(URL, { format: videoFormat }).pipe(res);
            } else {
                res.status(400).send('The requested format does not contain both audio and video');
            }
        } else {
            res.status(400).send('Invalid format. Only mp3 and mp4 are supported.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
