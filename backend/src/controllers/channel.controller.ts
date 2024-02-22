import { Request, Response } from 'express';
import prisma from "../utils/db";

const getChannels =async (req: Request, res: Response) => { 
  try {
    const params = req.params
    const channels = await prisma.channel.findMany({
      where: {
        guildId: Number.parseInt(params.id)
      }
    })

    if(!channels) return res.status(400).json({"message": "Error"})

    return res.status(200).json(channels)

  } catch (error) {
    
  }
}

export { getChannels }