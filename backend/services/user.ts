import { Role, User, User as UserModel } from "../../api-types";
import { getmockLoggedUser } from "../mock/mockLoggedUser";
import DB from "./db";

// const DB: User[] = [];

const userSchema = new DB.Schema({
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  image: { type: Buffer, required: false }, // Binary data
  subjects: { type: [String], required: false },
  classes: { type: [String], required: false },
  class: { type: String, required: false },
  token: { type: String, required: false, default: null },
});

const UserModel = DB.model("user", userSchema);

export const index = async () => {
  return UserModel.find({});
};

export const getUsersByRole = async (role: Role) => {
  return UserModel.find({ role });
};

export const getUsersWithoutClass = async() => {
  return UserModel.find({ role: "student", student_class: {$exists: false} });  
}

//---------------VIEW BY ID------------------------
export const viewForAdmin = async (id: string) => {
  return UserModel.findById(id);
};

export const viewForTeacher = async (id: string, role: Role) => {
  return UserModel.findById(id).where(role);
};

export const viewForStudent = async (id: string) => {
  return UserModel.findById(id);
};

export const add = async (user: User) => {
  const UserData = new UserModel(user);
  return UserData.save();
};

export const edit = async (id, user: User) => {
  const UserDocument = await UserModel.findById(id);

  if (!UserDocument) {
    throw new Error(`Can't find user by id: ${user._id}`);
  }

  UserDocument.set(user);
  return UserDocument.save();
};

export const remove = async (id: string) => {
  return UserModel.deleteOne({ _id: id });
};
