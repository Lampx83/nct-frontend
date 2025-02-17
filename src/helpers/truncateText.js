const truncateText = (text, maxLength) => {
  if (!text) return "";
  const strippedText = text.replace(/<\/?[^>]+(>|$)/g, "");
  return strippedText.length > maxLength
    ? strippedText.slice(0, maxLength) + "..."
    : strippedText;
};

export default truncateText;