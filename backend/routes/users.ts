import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { isAdmin,getmockLoggedUser } from "../mock/mockLoggedUser";

import {
  add,
  edit,
  getUsersByRole,
  getUsersWithoutClass,
  index,
  remove,
  viewForAdmin,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});


const isAdminMiddleware = async (ctx, next) => {
  const is_admin = isAdmin();
  if (is_admin) {
    await next();
  } else {
    ctx.status = 401;
    ctx.response.body = "user non autorizzato";
  }
};

// All routes
router.get("/",isAdminMiddleware ,async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/role/:role",isAdminMiddleware, async (ctx) => {
  //Check if logged user == admin 
  ctx.response.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", async (ctx) => {
  const loggedUser = getmockLoggedUser()
  let user;
  switch(loggedUser.role){
    case "admin":
       user = await viewForAdmin(ctx.params.id);
      break
/*       case "teacher":
      user = await viewForTeacher(ctx.params.id);
      break
    case "student":
      user = await viewForStudent(ctx.params.id);
      break  */
  }
  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Add a user
//Lo fa l'altro gruppo
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// Edit a user
router.put("/:id", async (ctx) => {
  //Check if logged user == admin, admin cant edit _id, token and other data admin
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
router.delete("/:id",isAdminMiddleware, async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

// Find all studens without a class
router.get("/students-without-class" , async(ctx) =>{
  //Check if logged user == admin
  ctx.body = await getUsersWithoutClass();
});

export default router;
