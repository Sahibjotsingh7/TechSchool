const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    const command = `python "${filepath}"`;  // Execute without asking for input (since input() is replaced)
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject({ error: "Runtime error", details: stderr || stdout });
      }
      resolve(stdout); // Return the output of the Python script
    });
  });
};



module.exports = {
  executePy,
};
