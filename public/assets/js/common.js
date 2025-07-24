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
let clickCount = parseInt(localStorage.getItem("clickCount") || "0");
let lastHideTime = parseInt(localStorage.getItem("lastHideTime") || "0");

function handleClickRedirect() {
  const overlay = document.getElementById("adOverlay");

  if (clickCount < links.length) {
    window.open(links[clickCount], "_blank");
    clickCount++;
    localStorage.setItem("clickCount", clickCount);
  }

  if (clickCount >= links.length) {
    overlay.style.display = "none";
    const now = Date.now();
    localStorage.setItem("lastHideTime", now);

    setTimeout(() => {
      clickCount = 0;
      localStorage.setItem("clickCount", "0");
      overlay.style.display = "flex";
    }, 60000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/overlay-links")
    .then((res) => res.json())
    .then((data) => {
      links = [data.tiktok, data.shopee];

      const overlay = document.getElementById("adOverlay");
      if (clickCount >= links.length) {
        const now = Date.now();
        const elapsed = now - lastHideTime;
        if (elapsed >= 60000) {
          clickCount = 0;
          localStorage.setItem("clickCount", "0");
          overlay.style.display = "flex";
        } else {
          overlay.style.display = "none";
        }
      } else {
        overlay.style.display = "flex";
      }
    });
});
