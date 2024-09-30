export const errorHandler = (err, req, res, next) => {
  console.log("aaaaaaaaaaa", err.message);
  const status = err.statusCode || 500;
  const message = err.message || "";
  return res
    .status(status)
    .json({ success: false, status: status, message: message });
};
