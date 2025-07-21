const { randomUUID } = require("node:crypto");
const sessionModal = require("../../model/session.model");

// 1. Tạo ra session ID (sid) => bằng một chuỗi ngẫu nhiên, không trùng lặp
// 2. Gửi phản hồi (server -> client) yêu cầu browser tạo ra cookie sid=xxx
// 3. Lấy sid từ cookie để xác định client
async function handleSession(req, res, next) {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionModal.findById(_sid));

  // Nếu session tồn tại nhưng đã hết hạn => xoá session
  if (
    session &&
    session.expires_at &&
    new Date(session.expires_at) < new Date()
  ) {
    await sessionModal.remove(_sid);
    session = null;
  }

  // Nếu không có session hoặc bị xoá => tạo mới
  if (!session) {
    _sid = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 tiếng

    session = await sessionModal.create({ sid: _sid, expires_at: expiresAt });

    res.set(
      "Set-Cookie",
      `sid=${_sid}; path=/; httpOnly; expires=${expiresAt.toUTCString()}`
    );
  }

  // Parse session data
  let sessionData = JSON.parse(session.data ?? null) ?? {};

  // Nếu muốn gia hạn mỗi lần truy cập → cập nhật expires_at
  await sessionModal.update(_sid, {
    expires_at: new Date(Date.now() + 60 * 60 * 1000),
  });

  req.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    async set(key, value) {
      sessionData[key] = value;
      await sessionModal.update(_sid, {
        data: JSON.stringify(sessionData),
      });
    },
    async unset(key) {
      delete sessionData[key];
      await sessionModal.update(_sid, {
        data: JSON.stringify(sessionData),
      });
    },
  };

  req.flash = async (type, message) => {
    const flashes = sessionData._flashes ?? {};
    if (!flashes[type]) flashes[type] = [];
    flashes[type].push(message);
    await req.session.set("_flashes", flashes);
  };

  res.locals.getFlashes = () => {
    const flashes = sessionData._flashes || {};
    req.session.unset("_flashes");
    return flashes;
  };

  next();
}

module.exports = handleSession;
