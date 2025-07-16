import { publicMiddleware } from './middlewares/publicMiddleware';
import { stackMiddlewares } from './middlewares/stackMiddlewares';

const middlewares = [publicMiddleware];
export default stackMiddlewares(middlewares);

//run this middleware for all paths after admin/*
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.ico).*)'],
};
