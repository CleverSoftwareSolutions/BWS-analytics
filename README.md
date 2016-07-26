# BWS-Analytics

## Commands

#### Setup
```bash
npm install
```
#### Development
```bash
# using nodemon
npm start

# using babel-watch
npm run watch
```

## Dependencies

- Watcher and hot-reload: [nodemon](http://nodemon.io/)
- Build: [babel](http://babeljs.io/)
    + tools: babel-register
    + presets: babel-preset-es2015-node5
    + plugins: transform-async-to-generator, syntax-async-functions
