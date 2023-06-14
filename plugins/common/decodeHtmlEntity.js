let decodeHtmlEntity = function(x) {
  return x.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

export default decodeHtmlEntity;
