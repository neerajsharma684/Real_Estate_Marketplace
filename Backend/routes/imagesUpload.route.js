import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import multer from "multer";

dotenv.config();

const router = express.Router();
const upload = multer(); // Multer to handle form-data image uploads

const token = process.env.GIT_ACCESS_TOKEN;
const repoUrl = process.env.IMAGES_UPLOAD_PATH; // e.g., https://api.github.com/repos/yourusername/your-repo/contents/images/
const branch = "main";

router.post("/", upload.single("image"), async (req, res) => {
  const { uniqueFileName } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send("No image file provided.");
  }

  try {
    const base64data = imageFile.buffer.toString("base64");

    const response = await fetch(`${repoUrl}${uniqueFileName}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload image ${uniqueFileName}`,
        content: base64data,
        branch: branch,
      }),
    });

    if (response.ok) {
      res.status(200).send("Image uploaded successfully");
    } else {
      const errorData = await response.json();
      res.status(500).send(`Image upload failed: ${errorData.message}`);
    }
  } catch (error) {
    res.status(500).send("Error during upload: " + error.message);
  }
});

export default router;
