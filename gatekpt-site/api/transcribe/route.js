import { IncomingForm } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return resolve(
          new Response(JSON.stringify({ error: 'File parsing failed' }), {
            status: 500,
          })
        );
      }

      try {
        const file = files.file;
        const fileStream = fs.createReadStream(file.filepath);

        const formData = new FormData();
        formData.append('file', fileStream);
        formData.append('model', 'whisper-1');

        const openaiRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: formData,
        });

        const result = await openaiRes.json();

        return resolve(
          new Response(JSON.stringify({ transcription: result.text }), {
            status: 200,
          })
        );
      } catch (err) {
        console.error('Error calling OpenAI:', err);
        return resolve(
          new Response(JSON.stringify({ error: 'Transcription failed' }), {
            status: 500,
          })
        );
      }
    });
  });
}
