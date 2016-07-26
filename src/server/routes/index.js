import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';

const routerConfigs = [{ folder: 'api', prefix: '/api' }];

export default function routes() {
  const composed = routerConfigs.reduce((prev, curr) => {
    const _routes = importDir('./' + curr.folder);
    const router = new Router({
      prefix: curr.prefix
    });

    Object.keys(_routes).map(name => _routes[name](router));

    return [router.routes(), router.allowedMethods(), ...prev];
  }, []);

  return compose(composed);
}
