var handleError = (res, reason, message, code) => {
  console.log("Error Occured: " + reason);
  res.status(code || 500);
  res.json({success: false, message: message});
  res.end();
}

module.exports = handleError;
