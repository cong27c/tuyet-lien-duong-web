const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const storySchema = {
  title: {
    notEmpty: {
      errorMessage: "Vui lòng nhập tên truyện",
    },
  },
  summary: {
    notEmpty: {
      errorMessage: "Vui lòng nhập văn án của truyện",
    },
  },
  genre: {
    custom: {
      options: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          throw new Error("Vui lòng chọn thể loại");
        }
        return true;
      },
    },
  },

  author: {
    notEmpty: {
      errorMessage: "Vui lòng nhập tên tác giả",
    },
  },
  content: {
    notEmpty: {
      errorMessage: "Vui lòng nhập nội dung truyện",
    },
  },
  rating: {
    notEmpty: {
      errorMessage: "Vui lòng chọn đánh giá",
    },
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: "Đánh giá phải là số từ 1 đến 5",
    },
  },
  readers: {
    notEmpty: {
      errorMessage: "Vui lòng nhập số lượng người đọc",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "Số người đọc phải là số nguyên không âm",
    },
  },
  release_date: {
    notEmpty: {
      errorMessage: "Vui lòng chọn ngày phát hành",
    },
    isDate: {
      errorMessage: "Ngày phát hành không hợp lệ",
    },
  },
  is_completed: {
    optional: true,
    toBoolean: true,
  },
  is_featured: {
    optional: true,
    toBoolean: true,
  },
};

exports.createStory = [
  (req, res, next) => {
    res.view = "admin/stories/create";
    next();
  },
  checkSchema(storySchema),
  handleValidationErrors,
];

exports.editStory = [
  (req, res, next) => {
    res.view = "admin/stories/edit";
    next();
  },

  checkSchema(storySchema),
  handleValidationErrors,
];
