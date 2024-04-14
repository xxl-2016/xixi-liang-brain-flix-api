const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function readFile(file, callback) {
  fs.readFile(file, "utf8", callback);
}

function writeFile(file, data, callback) {
  fs.writeFile(file, JSON.stringify(data), callback);
}

router.get("/", (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.status(200).json(
      JSON.parse(data).map((video) => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      }))
    );
  });
});

router.get("/:id", (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    const video = JSON.parse(data).find(
      (video) => video.id === request.params.id
    );
    if (!video) {
      return response.status(404).send("Video not found");
    }
    response.status(200).json(video);
  });
});

router.post("/", upload.single("file"), (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    const videos = JSON.parse(data);
    const newVideo = {
      id: uuidv4(),
      title: request.body.title,
      channel: "BrainStation Feb West",
      image: "http://localhost:3000/images/Upload-video-preview.jpg",
      description: request.body.description,
      views: "0",
      likes: "0",
      duration: "4:20",
      video: "http://localhost:3000/images/BrainStation Sample Video.mp4",
      timestamp: Date.now(),
      comments: [],
    };
    videos.push(newVideo);
    writeFile("./data/video-details.json", videos, (err) => {
      if (err) {
        return response.status(500).send(err);
      }
      response.status(201).json(newVideo);
    });
  });
});

router.post("/:id/comments", (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    const videos = JSON.parse(data);
    const videoIndex = videos.findIndex(
      (video) => video.id === request.params.id
    );
    if (videoIndex === -1) {
      return response.status(404).send("Video not found");
    }
    const video = videos[videoIndex];
    const newComment = {
      name: request.body.name,
      comment: request.body.comment,
      id: uuidv4(),
      likes: 0,
      timestamp: Date.now(),
    };
    video.comments.push(newComment);
    videos[videoIndex] = video;
    writeFile("./data/video-details.json", videos, (err) => {
      if (err) {
        return response.status(500).send(err);
      }
      response.status(201).json(newComment);
    });
  });
});

router.delete("/:id/comments/:commentId", (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    const videos = JSON.parse(data);
    const video = videos.find((video) => video.id === request.params.id);
    if (!video) {
      return response.status(404).send("Video not found");
    }
    const comment = video.comments.find(
      (comment) => comment.id === request.params.commentId
    );
    if (!comment) {
      return response.status(404).send("Comment not found");
    }
    video.comments = video.comments.filter(
      (comment) => comment.id !== request.params.commentId
    );
    writeFile("./data/video-details.json", videos, (err) => {
      if (err) {
        return response.status(500).send(err);
      }
      response.status(204).send();
    });
  });
});

router.put("/:id/comments/:commentId/likes", (request, response) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      return response.status(500).send(err);
    }
    const videos = JSON.parse(data);
    const video = videos.find((video) => video.id === request.params.id);
    if (!video) {
      return response.status(404).send("Video not found");
    }
    const comment = video.comments.find(
      (comment) => comment.id === request.params.commentId
    );
    if (!comment) {
      return response.status(404).send("Comment not found");
    }
    comment.likes++;
    writeFile("./data/video-details.json", videos, (err) => {
      if (err) {
        return response
          .status(500)
          .send("An error occurred while updating the comment");
      }
      response.status(200).json(comment);
    });
  });
});

module.exports = router;
