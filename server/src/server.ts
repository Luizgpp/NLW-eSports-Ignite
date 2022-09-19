import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import {
  convertHourStringToMinutes,
  convertMinutesToHourString,
} from "./utils/utils";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});
/**
 * Query: localhost/ads=?page=2&sort=name
 * Route: localhost/ads/lol
 * Body: escondido
 */

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearPlaying: body.yearPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      hourStart: true,
      hourEnd: true,
      weekDays: true,
      yearPlaying: true,
      useVoiceChannel: true,
      game: true,
      gameId: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUnique({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json(ad);
});

app.listen(3333);
