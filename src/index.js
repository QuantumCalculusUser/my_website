export default {
  async fetch(request) {
    return new Response(`
      <html>
        <head><title>My Site</title></head>
        <body>
          <h1>Website is working</h1>
        </body>
      </html>
    `, {
      headers: { "content-type": "text/html" }
    });
  }
};
