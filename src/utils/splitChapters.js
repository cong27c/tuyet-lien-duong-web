function splitContentIntoNChapters(content, numChapters) {
  let parts = content.split(/\n\s*\n/);

  if (parts.length < numChapters) {
    parts = content.split(/(?<=[.?!])\s+(?=[A-ZÀ-Ỵ])/);
  }

  const partsPerChapter = Math.ceil(parts.length / numChapters);
  const chapters = [];

  for (let i = 0; i < parts.length; i += partsPerChapter) {
    chapters.push(parts.slice(i, i + partsPerChapter).join(" "));
  }

  return chapters;
}

module.exports = splitContentIntoNChapters;
