import { ObjectId } from "mongodb";
import { db } from "../db/index.ts";
import type { ITicket, eStatus } from "../models.ts";

const categoriesServices = {
  readAll: () => {
    return db()
      .collection("ticket_list")
      .aggregate([
        { $addFields: { id: { $toString: "$_id" } } },
        { $project: { _id: 0 } },
      ])
      .toArray();
  },
  create: (body: ITicket) => {
    return db().collection("ticket_list").insertOne(body);
  },
  patch: (nextUpdate: { id: string; status: typeof eStatus }) => {
    return db()
      .collection("ticket_list")
      .findOneAndUpdate(
        { _id: new ObjectId(nextUpdate.id) },
        { $set: { status: nextUpdate.status } },
      );
  },
};

export default categoriesServices;
