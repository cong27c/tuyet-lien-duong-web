const input = document.getElementById("search-input");
const suggestionsBox = document.getElementById("suggestions-box");
const form = document.getElementById("search-form");

let timeout = null;
let currentSuggestions = [];
input.addEventListener("input", () => {
  const query = input.value.trim();
  clearTimeout(timeout);

  if (!query) {
    suggestionsBox.classList.add("hidden");
    x``;
    suggestionsBox.innerHTML = "";
    currentSuggestions = [];
    return;
  }

  timeout = setTimeout(() => {
    fetch(`/truyen/goi-y?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) {
          suggestionsBox.classList.add("hidden");
          suggestionsBox.innerHTML = "";
          currentSuggestions = [];
          return;
        }

        currentSuggestions = data;

        suggestionsBox.innerHTML = data
          .map(
            (item) => `
                <a href="/truyen/${item.id}" class="block px-4 py-2 hover:bg-gray-100 text-gray-800">
                  ${item.title}
                </a>
              `
          )
          .join("");

        suggestionsBox.classList.remove("hidden");
      });
  }, 300);
});

// ✅ Chặn form nếu không có gợi ý
form.addEventListener("submit", (e) => {
  e.preventDefault(); // chặn mặc định trước

  const firstSuggestion = suggestionsBox.querySelector("a");

  if (firstSuggestion) {
    // Nếu có gợi ý => chuyển hướng
    window.location.href = firstSuggestion.href;
  } else {
    // Không có gợi ý => chặn tìm kiếm, có thể báo cho người dùng
    alert("Vui lòng chọn truyện từ gợi ý."); // hoặc dùng toast, modal...
  }
});

// Ẩn gợi ý khi click ra ngoài
document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== input) {
    suggestionsBox.classList.add("hidden");
  }
});

// Liên kết quảng cáo
let links = [];
let clickIndex = parseInt(localStorage.getItem("clickIndex") || "0");
let lastClickTime = parseInt(localStorage.getItem("lastClickTime") || "0");

function handleClickRedirect() {
  const overlay = document.getElementById("adOverlay");

  if (links.length > 0) {
    window.open(links[clickIndex], "_blank");

    // Cập nhật index ưu tiên click
    clickIndex = (clickIndex + 1) % links.length;
    localStorage.setItem("clickIndex", clickIndex.toString());

    // Ghi nhận thời gian click
    const now = Date.now();
    localStorage.setItem("lastClickTime", now.toString());

    // Ẩn overlay
    overlay.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // ✅ Kiểm tra nếu đường dẫn bắt đầu bằng "/truyen"
  if (!window.location.pathname.startsWith("/truyen")) return;

  fetch("/api/overlay-links")
    .then((res) => res.json())
    .then((data) => {
      // Tỉ lệ: Shopee 3 lần, TikTok 1 lần
      links = [data.shopee, data.shopee, data.shopee, data.tiktok];

      const overlay = document.getElementById("adOverlay");
      const now = Date.now();
      const elapsed = now - lastClickTime;

      if (elapsed >= 10 * 60 * 1000) {
        overlay.style.display = "flex";
      } else {
        overlay.style.display = "none";
      }
    });
});
