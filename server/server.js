
const fs = require('fs');
const pdf = require('pdf-parse');
const diff = require('diff');

async function readPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

async function comparePDFs(file1, file2) {
  try {
    const text1 = await readPDF(file1);
    const text2 = await readPDF(file2);

    if (text1 === text2) {
      console.log('Files are identical');
    } else {
      console.log('Files are different');
      const differences = diff.diffLines(text1, text2);

      differences.forEach(part => {
        if (part.added) {
          console.log('\x1b[31m', part.value); // Output added lines in red
        } else if (part.removed) {
          console.log('\x1b[32m', part.value); // Output removed lines in green
        } else {
          console.log('\x1b[0m', part.value); // Output unchanged lines in default color
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Replace 'file1.pdf' and 'file2.pdf' with the paths to your PDF files
comparePDFs('./files/file2.pdf', './files/file2.pdf');