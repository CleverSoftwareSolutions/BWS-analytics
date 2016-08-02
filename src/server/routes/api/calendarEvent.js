import CalendarEvent from '../../models/CalendarEvent';
import {isJwtAuthenticated} from '../../auth';

export default (router) => {
  router
    .get('/events', async (ctx) =>
      ctx.body = await CalendarEvent.find())

    .get('/events/:id', async (ctx) =>
      ctx.body = await CalendarEvent.findById(ctx.params.id))

    .post('/events',
      isJwtAuthenticated(),
      async (ctx) =>
        ctx.body = await new CalendarEvent(ctx.request.body).save())

    .put('/events/:id',
      isJwtAuthenticated(),
      async (ctx) =>
        ctx.body =
          await CalendarEvent.findByIdAndUpdate(ctx.params.id, ctx.body))

    .delete('/events/:id',
      isJwtAuthenticated(),
      async (ctx) =>
        ctx.body = await CalendarEvent.findByIdAndRemove(ctx.params.id));
};
