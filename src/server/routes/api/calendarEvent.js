import CalendarEvent from '../../models/CalendarEvent';

const basePath = '/event';

export default (router) => {
  router.get(`${basePath}/`, async (ctx, next) =>
    ctx.body = await CalendarEvent.find());

  router.post(`${basePath}/`, async (ctx, next) =>
    ctx.body = await new CalendarEvent(ctx.request.body).save());

  router.get(`${basePath}/:id`, async (ctx, next) =>
    ctx.body = await CalendarEvent.findById(ctx.params.id));

  router.put(`${basePath}/:id`, async (ctx, next) =>
    ctx.body = await CalendarEvent.findByIdAndUpdate(ctx.params.id, ctx.body));

  router.delete(`${basePath}/:id`, async (ctx, next) =>
    ctx.body = await CalendarEvent.findByIdAndRemove(ctx.params.id));
};
