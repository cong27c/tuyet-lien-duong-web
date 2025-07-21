const storiesService = require("../../services/stories.service");

exports.index = async (req, res) => {
  const genres = [
    { title: "ABO", value: "abo" },
    { title: "BE", value: "be" },
    { title: "Báo Thù", value: "bao-thu" },
    { title: "Chữa Lành", value: "chua-lanh" },
    { title: "Cung Đấu", value: "cung-dau" },
    { title: "Cổ Đại", value: "co-dai" },
    { title: "Cứu Rỗi", value: "cuu-roi" },
    { title: "Gia Đấu", value: "gia-dau" },
    { title: "HE", value: "he" },
    { title: "Hiện Đại", value: "hien-dai" },
    { title: "Hoàng Cung", value: "hoang-cung" },
    { title: "Hoán Đổi Thân Xác", value: "hoan-doi-than-xac" },
    { title: "Huyền Huyễn", value: "huyen-huyen" },
    { title: "Hài Hước", value: "hai-huoc" },
    { title: "Hào Môn", value: "hao-mon" },
    { title: "Hệ Thống", value: "he-thong" },
    { title: "Kinh Dị", value: "kinh-di" },
    { title: "Linh Dị", value: "linh-di" },
    { title: "Mạt Thế", value: "mat-the" },
    { title: "Ngôn Tình", value: "ngon-tinh" },
    { title: "Ngược", value: "nguoc" },
    { title: "Ngọt Sủng", value: "ngot-sung" },
    { title: "Nhân Thú", value: "nhan-thu" },
    { title: "Nữ Cường", value: "nu-cuong" },
    { title: "OE", value: "oe" },
    { title: "SE", value: "se" },
    { title: "Showbiz", value: "showbiz" },
    { title: "Sinh Tồn", value: "sinh-ton" },
    { title: "Sảng Văn", value: "sang-van" },
    { title: "Thanh Xuân Vườn Trường", value: "thanh-xuan-vuon-truong" },
    { title: "Thiên Kim", value: "thien-kim" },
    { title: "Thế Thân", value: "the-than" },
    { title: "Trọng Sinh", value: "trong-sinh" },
    { title: "Tu Tiên", value: "tu-tien" },
    { title: "Tình Cảm", value: "tinh-cam" },
    { title: "Tình Cảm Gia Đình", value: "tinh-cam-gia-dinh" },
    { title: "Tổng Tài", value: "tong-tai" },
    { title: "Tội Phạm", value: "toi-pham" },
    { title: "Vã Mặt", value: "va-mat" },
    { title: "Xuyên Không", value: "xuyen-khong" },
    { title: "Xuyên Sách", value: "xuyen-sach" },
    { title: "Đam Mỹ", value: "dam-my" },
    { title: "Điền Văn", value: "dien-van" },
    { title: "Đề cử", value: "de-cu" },
    { title: "Đọc Tâm", value: "doc-tam" },
  ];
  try {
    const stories = await storiesService.getAll();
    const featuredStories = await storiesService.getFeatured(5);
    const recentStories = await storiesService.getRecent(3);
    res.render("home.ejs", {
      genres,
      stories,
      featuredStories,
      recentStories,
    });
  } catch (error) {
    console.error("Lỗi khi load trang chủ:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};
