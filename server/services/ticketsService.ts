import { db } from "../db/index.ts";
import type { ITicket } from "../models.ts";

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
};

export default categoriesServices;
