import crypto from 'crypto';

export interface EsewaFormFields {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

const SIGNED_FIELDS = 'total_amount,transaction_uuid,product_code';

export function generateEsewaSignature(
  totalAmount: string,
  transactionUuid: string,
  productCode: string,
  secretKey: string
): string {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

export function buildEsewaFormFields(params: {
  amount: number;
  transactionUuid: string;
  merchantCode: string;
  secretKey: string;
  successUrl: string;
  failureUrl: string;
}): EsewaFormFields {
  const { amount, transactionUuid, merchantCode, secretKey, successUrl, failureUrl } = params;

  const taxAmount = 0;
  const serviceCharge = 0;
  const deliveryCharge = 0;
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;

  const signature = generateEsewaSignature(
    totalAmount.toString(),
    transactionUuid,
    merchantCode,
    secretKey
  );

  return {
    amount: amount.toString(),
    tax_amount: taxAmount.toString(),
    total_amount: totalAmount.toString(),
    transaction_uuid: transactionUuid,
    product_code: merchantCode,
    product_service_charge: serviceCharge.toString(),
    product_delivery_charge: deliveryCharge.toString(),
    success_url: successUrl,
    failure_url: failureUrl,
    signed_field_names: SIGNED_FIELDS,
    signature,
  };
}

export interface EsewaStatusResponse {
  product_code: string;
  transaction_uuid: string;
  total_amount: number;
  status: 'COMPLETE' | 'PENDING' | 'FULL_REFUND' | 'PARTIAL_REFUND' | 'AMBIGUOUS' | 'NOT_FOUND' | 'CANCELED';
  ref_id?: string;
}

export async function verifyEsewaTransaction(params: {
  statusUrl: string;
  productCode: string;
  totalAmount: string;
  transactionUuid: string;
}): Promise<EsewaStatusResponse> {
  const { statusUrl, productCode, totalAmount, transactionUuid } = params;
  const url = `${statusUrl}/?product_code=${encodeURIComponent(
    productCode
  )}&total_amount=${encodeURIComponent(totalAmount)}&transaction_uuid=${encodeURIComponent(
    transactionUuid
  )}`;

  const res = await fetch(url, { method: 'GET', cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`eSewa status check failed with HTTP ${res.status}`);
  }
  return res.json();
}

export function decodeEsewaResponse(base64Data: string) {
  const json = Buffer.from(base64Data, 'base64').toString('utf-8');
  return JSON.parse(json);
}
