import { Request, Response } from 'express';
import { verifyCustomerInfo } from '../helpers/helpers';

export function submitCustomerInfo(req: Request, res: Response) {
  console.log('Sending customer info ...', req.body);

  const { businessPhone, dob, homePhone, postalCode, email } = req.body;
  const verifyCard = verifyCustomerInfo(
    businessPhone,
    dob,
    homePhone,
    postalCode,
    email
  );

  if (verifyCard.result) {
    res.status(200).json({ message: 'Success' });
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
