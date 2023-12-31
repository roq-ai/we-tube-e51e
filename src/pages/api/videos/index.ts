import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { videoValidationSchema } from 'validationSchema/videos';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getVideos();
    case 'POST':
      return createVideo();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVideos() {
    const data = await prisma.video
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'video'));
    return res.status(200).json(data);
  }

  async function createVideo() {
    await videoValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.comment?.length > 0) {
      const create_comment = body.comment;
      body.comment = {
        create: create_comment,
      };
    } else {
      delete body.comment;
    }
    if (body?.reaction?.length > 0) {
      const create_reaction = body.reaction;
      body.reaction = {
        create: create_reaction,
      };
    } else {
      delete body.reaction;
    }
    const data = await prisma.video.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
