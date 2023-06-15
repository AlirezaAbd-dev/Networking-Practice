const dns = require("dns/promises");

(async () => {
  const result = await dns.lookup("AlirezaAbd-dev.vercel.app");
  console.log(result);
})();
