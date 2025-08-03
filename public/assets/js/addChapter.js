let chapterCount = 0;

function addChapter(title = "", content = "") {
  const wrapper = document.getElementById("chapters-wrapper");

  const chapterHTML = `
      <div class="border p-4 rounded-md bg-gray-50 relative">
        <button type="button" onclick="this.parentElement.remove()" class="absolute top-2 right-2 text-red-500 hover:text-red-700">
          <i class="fas fa-times"></i>
        </button>

        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề chương</label>
          <input
            type="text"
            name="chapters[${chapterCount}][title]"
            value="${title}"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: Chương 1 - Khởi đầu"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung chương</label>
          <textarea
            name="chapters[${chapterCount}][content]"
            rows="6"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập nội dung chương..."
          >${content}</textarea>
        </div>
      </div>
    `;

  wrapper.insertAdjacentHTML("beforeend", chapterHTML);
  chapterCount++;
}
