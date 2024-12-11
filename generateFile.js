const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content, userInputs) => {
  try {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);

    console.log("Generating file at path:", filepath);

    // For Python code, replace input() calls with user input values
    if (format === 'py' && userInputs) {
      const inputs = userInputs.split(",").map(input => input.trim());
      content = content.replace(/input\(".*"\)/g, () => `(${inputs.shift()})`);
    }

    // For C++ code, replace cin >> variable; with user inputs
    // if (format === 'cpp' && userInputs) {
    //   const inputs = userInputs.split(",").map(input => input.trim());
    //   content = content.replace(/cin\s*>>\s*\w+/g, () => `cin >> ${inputs.shift()}`);
    // }

    // Write to file
    await fs.writeFileSync(filepath, content);
    return filepath;
  } catch (error) {
    console.error("Error in generating file:", error);
    throw new Error("Error in generating file");
  }
};


module.exports = {
  generateFile,
};
