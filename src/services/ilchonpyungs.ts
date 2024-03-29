import { Request, Response, NextFunction } from 'express';
import { Ilchonpyungs as IlchonpyungsType } from '../db/entities';
import { Ilchonpyungs, Myhomes } from '../db/repositories';
import { CreateIlchonpyungForm } from '../interfaces/Ilchonpyung';
import datetime from '../utils/datetime';

export default {
  // 일촌평 작성
  createBest: async (req: Request, res: Response) => {
    const { ilchonpyung, nick } = req.body;
    const { myhomeId } = req.params;
    const { user } = res.app.locals;

    // 미니홈피의 user data가 없을시
    const existUser = await Myhomes.findByMyhome(+myhomeId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    if (!nick) throw new Error('일촌명을 입력해주세요.');

    // 일촌평을 작성하지 않거나 3자 이하로 작성시 예외처리
    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 3)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    // 본인의 미니홈피에 일촌평 작성시 예외처리
    if (user.userId === existUser.userId)
      throw new Error('본인 미니홈피에는 작성이 불가합니다.');

    // 두 개 이상의 일촌평 작성 시도시 예외처리
    const existBest = await Ilchonpyungs.findByWriter(user.userId, +myhomeId);
    if (existBest) throw new Error('일촌평은 하나만 작성 가능합니다.');

    const CreateForm: CreateIlchonpyungForm = {
      userId: user.userId,
      myhomeId: +myhomeId,
      nick,
      name: user.name,
      ilchonpyung,
    };

    await Ilchonpyungs.createBest(CreateForm);
  },

  // 일촌평 목록 조회
  getBests: async (req: Request, res: Response) => {
    const { myhomeId } = req.params;

    const findIlchonpyungs = await Ilchonpyungs.getBests(+myhomeId);

    findIlchonpyungs.map((best: IlchonpyungsType) => {
      best.createdAt = datetime.createDatetime(best.createdAt);
      best.updatedAt = datetime.createDatetime(best.updatedAt);
    });

    return findIlchonpyungs;
  },

  updateBest: async (req: Request, res: Response) => {
    const { ilchonpyungId, myhomeId } = req.params;
    const { ilchonpyung, nick } = req.body;
    const { user } = res.app.locals;

    if (!nick) throw new Error('일촌명을 입력해주세요.');

    // 일촌평을 작성하지 않거나 3자 이하로 작성시 예외처리
    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 3)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    const best = await Ilchonpyungs.findByBest(+ilchonpyungId, +myhomeId);
    const myhome = await Myhomes.findByMyhome(+myhomeId);

    if (!best || !myhome) throw new Error('잘못된 요청입니다.');
    if (best.userId != user.userId)
      throw new Error('본인이 작성한 일촌평이 아닙니다.');

    const CreateForm: CreateIlchonpyungForm = {
      ilchonpyungId: best!.ilchonpyungId,
      userId: user.userId,
      myhomeId: +myhomeId,
      nick,
      name: user.name,
      ilchonpyung,
    };

    await Ilchonpyungs.updateBest(CreateForm);
  },

  // 일촌평 삭제
  deleteBest: async (req: Request, res: Response) => {
    const { ilchonpyungId, myhomeId } = req.params;
    const { user } = res.app.locals;

    const best = await Ilchonpyungs.findByBest(+ilchonpyungId, +myhomeId);
    const myhome = await Myhomes.findByMyhome(+myhomeId);

    if (!best || !myhome) throw new Error('잘못된 요청입니다.');
    if (best.userId === user.userId || best.myhomeId === user.myhomeId)
      await Ilchonpyungs.deleteBest(+ilchonpyungId, +myhomeId);
    else throw new Error('본인 또는 작성자만 삭제할 수 있습니다.');
  },
};
