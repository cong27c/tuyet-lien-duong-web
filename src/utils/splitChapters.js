function splitContentIntoNChapters(content, numChapters) {
  const paragraphs = content.split(/\n\s*\n/); // tách theo 2 dòng trắng
  const paragraphsPerChapter = Math.ceil(paragraphs.length / numChapters);
  const chapters = [];

  for (let i = 0; i < paragraphs.length; i += paragraphsPerChapter) {
    chapters.push(paragraphs.slice(i, i + paragraphsPerChapter).join("\n\n"));
  }

  return chapters;
}

module.exports = splitContentIntoNChapters;
