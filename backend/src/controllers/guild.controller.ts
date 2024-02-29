import { Permission, Role, Status } from '@prisma/client';
import prisma from '../utils/db';
import { Request, Response } from 'express';

const createGuild = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    console.log('Hello create guild');
    const guild = await prisma.guild.create({
      data: {
        name: data.name,
        creatorId: Number.parseInt(data.creator),
        guildMembership: {
          create: [
            {
              userId: Number.parseInt(data.creator),
              role: Role.GUILDMASTER,
            },
          ],
        },
        channel: {
          create: [
            {
              name: 'General',
              channelPermission: {
                create: [
                  {
                    userId: Number.parseInt(data.creator),
                    permission: Permission.READ_WRITE,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    if (guild) {
      console.log('test');
      return res.status(200).json(guild);
    } else {
      console.log('something wrong');
    }
  } catch (error) {
    console.log(error);
  }
};

const getGuildsByUser = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const worlds = await prisma.guildMembership.findMany({
      where: {
        userId: Number.parseInt(params.id),
      },
      select: {
        guild: {
          select: {
            id: true,
            name: true,
            channel: true
          }
        }
      },
    });

    if (!worlds) return res.status(400).json({ message: 'Not found' });

    return res.status(200).json({
      count: worlds.length,
      results: worlds,
    });
  } catch (error) {}
};

const getGuildById = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const world = await prisma.guild.findUnique({
      where: {
        id: Number.parseInt(params.id),
      },
    });

    if (!world) return res.status(400).json({ message: 'Not found' });

    return res.status(200).json(world);
  } catch (error) {}
};

const joinGuild = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const world = await prisma.guildRequest.create({
      data: {
        userId: Number.parseInt(data.userId),
        guildId: Number.parseInt(data.guildId),
        status: Status.PENDING,
      },
    });
    if (!world)
      return res.status(400).json({
        message: 'Error',
      });

    return res.status(200).json(world);
  } catch (error) {}
};

const acceptGuildRequest = async (req: Request, res: Response) => {
  try {
    const { userId, guildId } = req.body as { userId: number; guildId: number };

    const request = await prisma.guildRequest.update({
      where: {
        userId_guildId: { userId, guildId },
      },
      data: {
        status: Status.ACCEPTED,
      },
    });

    if (request) {
      const guild = await prisma.guildMembership.create({
        data: {
          guildId,
          userId,
          role: Role.MEMBER,
        },
      });

      if (guild) {
        return res.status(200).json(guild);
      } else {
        return res.status(400).json(guild);
      }
    } else {
      return res.status(400).json({ message: 'Error' });
    }
  } catch (error) {}
};

const rejectGuildRequest = async (req: Request, res: Response) => {
  try {
    const { userId, guildId } = req.body as { userId: number; guildId: number };

    const request = await prisma.guildRequest.update({
      where: {
        userId_guildId: { userId, guildId },
      },
      data: {
        status: Status.REJECTED,
      },
    });

    if (!request) return res.status(400).json({ message: 'Error' });

    if (request) {
      return res.status(200).json(request);
    }
  } catch (error) {}
};

export {
  createGuild,
  getGuildsByUser,
  getGuildById,
  joinGuild,
  acceptGuildRequest,
  rejectGuildRequest,
};
