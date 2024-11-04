import Router from "@koa/router";
import { Role, User } from "../../api-types";
import {
  add,
  edit,
  getUsersByRole,
  getUsersWithoutClass,
  index,
  remove,
  view,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});

// All routes
router.get("/", async (ctx) => {
  //Check if logged user == admin
  const all = await index();
  ctx.response.body = all;
});

router.get("/role/:role", async (ctx) => {
  //Check if logged user == admin 
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", async (ctx) => {
  //Check if logged user == admin
  const user = await view(ctx.params.id);

  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Add a user
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
router.delete("/:id", async (ctx) => {
  //Check if logged user == admin, admin cant delete others admin 
  ctx.body = await remove(ctx.params.id);
});

// Find all studens without a class
router.get("/students-without-class" , async(ctx) =>{
  //Check if logged user == admin
  ctx.body = await getUsersWithoutClass();
});

export default router;
