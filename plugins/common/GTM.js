let GTM_containerID = "";
if (process.env.MODE === "dev") {
  GTM_containerID = "GTM-WSFTPR5"; // local(Kairen)
} else if (process.env.MODE === "devOutsideNetwork") {
  GTM_containerID = "GTM-NV9ML5D"; // dev(Leo)
} else {
  GTM_containerID = "GTM-KPTPV2C"; // stage
}

if (process.client) {
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_containerID);
}

export default GTM_containerID;
