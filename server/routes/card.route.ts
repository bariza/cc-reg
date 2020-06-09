import {Request, Response} from 'express';
import {getCardResponse, verifyCardInfo} from "../helpers/helpers";

export function submitCardInfo(req: Request, res: Response) {

  console.log("Sending card info ...", req.body);

  const {cardNumber, cvc, expireDate} = req.body;
  const verifyCard = verifyCardInfo(cardNumber, cvc, expireDate);

  if (verifyCard.result) {
    res.status(200).json(getCardResponse());
  } else {
    let errorObject = {
      code: verifyCard.code || 'GLB/001',
      detailMessage: verifyCard.reason,
      source: '',
      type: ''
    };

    res.status(500).json(errorObject);
  }

}


