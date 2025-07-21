function splitContentIntoNChapters(content, numChapters) {
  const words = content.trim().split(/\s+/);
  const wordsPerChapter = Math.ceil(words.length / numChapters);
  const chapters = [];

  for (let i = 0; i < words.length; i += wordsPerChapter) {
    const chunk = words.slice(i, i + wordsPerChapter).join(" ");
    chapters.push(chunk);
  }

  return chapters;
}

module.exports = splitContentIntoNChapters;
