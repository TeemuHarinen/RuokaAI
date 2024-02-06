const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  if (req.method === 'POST') {
    console.log(`
      ${req.method} ${req.url} ${timestamp}
      req.body: ${JSON.stringify(req.body)}`);
  } else {
  console.log(`
      ${req.method} ${req.url} ${timestamp}`); 
      next(); 
  }; 
};

module.exports = logger;