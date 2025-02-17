// src/utils/embedYouTube.js
export function processYouTubeEmbeds(content) {
  if (!content) return "";
    
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const oembeds = doc.getElementsByTagName("oembed");

  Array.from(oembeds).forEach((oembed) => {
    const url = oembed.getAttribute("url");

    if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1].split("?")[0]
        : url.split("v=")[1].split("&")[0];

      const iframe = doc.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.width = "100%";
      iframe.height = "500";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      // Replace the <oembed> tag with the <iframe>
      oembed.parentNode.replaceChild(iframe, oembed);
    }
  });

  // Return the processed HTML as a string
  return doc.body.innerHTML;
}
