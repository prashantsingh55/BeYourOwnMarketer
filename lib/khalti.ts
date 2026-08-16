export interface KhaltiInitiateParams {
  return_url: string;
  website_url: string;
  amount: number; // in Paisa (NPR * 100)
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface KhaltiInitiateResponse {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
}

export interface KhaltiLookupResponse {
  pidx: string;
  total_amount: number;
  status: 'Completed' | 'Pending' | 'Initiated' | 'Refunded' | 'Expired' | 'User canceled';
  transaction_id: string | null;
  fee: number;
  refunded: boolean;
}

export async function initiateKhaltiPayment(params: {
  initiateUrl: string;
  secretKey: string;
  payload: KhaltiInitiateParams;
}): Promise<KhaltiInitiateResponse> {
  const { initiateUrl, secretKey, payload } = params;

  const response = await fetch(initiateUrl, {
    method: 'POST',
    headers: {
      Authorization: secretKey.startsWith('Key ') ? secretKey : `Key ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.detail || data?.message || `Khalti initiate failed with HTTP ${response.status}`);
  }

  return data;
}

export async function lookupKhaltiPayment(params: {
  lookupUrl: string;
  secretKey: string;
  pidx: string;
}): Promise<KhaltiLookupResponse> {
  const { lookupUrl, secretKey, pidx } = params;

  const response = await fetch(lookupUrl, {
    method: 'POST',
    headers: {
      Authorization: secretKey.startsWith('Key ') ? secretKey : `Key ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pidx }),
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.detail || data?.message || `Khalti lookup failed with HTTP ${response.status}`);
  }

  return data;
}
