import express from 'express';
import router from './src/routes.js';

const app = express();
app.use(router);

console.log("Registered routes:");
router.stack.forEach(layer => {
  if (layer.route) {
    console.log(Object.keys(layer.route.methods).join(',').toUpperCase(), layer.route.path);
  }
});
process.exit(0);
