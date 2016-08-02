# BWS-Analytics

## Commands

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

## Deployment

### Dependencies

- Preferably a Linux machine
- MongoDB v > 2.6.0
- nvm with node v6.3.0
- have `pm2` installed globally
- nginx

### Process
After cloning the repoistory, `cd` into it, then:
```bash
  nvm use v6.3.0
  npm install
  export NODE_ENV=production
  pm2 src/index.js
```

Check `nginx.conf.sample` to get an idea about how to set up nginx.
