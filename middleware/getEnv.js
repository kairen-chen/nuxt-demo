export default async function(context) {
  // asyncData 的 context將拿到referer
  context.referer = process.server
    ? context.req.headers["host"]
    : navigator.userAgent;

  let handler = () => {
    const stringTmp = context.referer.split(/[\/]/);
    return `${process.env.protocol || "https"}://${stringTmp[0]}`;
  };
  if (Object.keys(context.store.state.env.data).length === 0) {
    const response = await fetch(
      `${process.server ? handler() : window.location.origin}/env.json`
    );
    const data = await response.json();
    context.store.dispatch("setEnv", data);
  }
  return;
}
