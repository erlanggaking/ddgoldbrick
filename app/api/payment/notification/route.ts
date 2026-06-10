import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Midtrans Notification Handler (Webhook)
// This endpoint receives payment status notifications from Midtrans

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-demo-key';

// In-memory order storage (replace with database in production)
const orders = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Midtrans notification received:', JSON.stringify(body, null, 2));

    const {
      order_id,
      transaction_status,
      fraud_status,
      gross_amount,
      payment_type,
      transaction_time,
      signature_key,
    } = body;

    // Verify signature
    const expectedSignature = crypto
      .createHash('sha512')
      .update(`${order_id}${transaction_status}${gross_amount}${MIDTRANS_SERVER_KEY}`)
      .digest('hex');

    if (signature_key !== expectedSignature) {
      console.error('Invalid signature for order:', order_id);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      );
    }

    // Determine transaction status
    let status = 'pending';
    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        status = 'paid';
      } else {
        status = 'fraud';
      }
    } else if (transaction_status === 'settlement') {
      status = 'paid';
    } else if (transaction_status === 'pending') {
      status = 'pending';
    } else if (
      transaction_status === 'deny' ||
      transaction_status === 'cancel' ||
      transaction_status === 'expire'
    ) {
      status = 'failed';
    } else if (transaction_status === 'refund') {
      status = 'refunded';
    }

    // Update order status
    const order = orders.get(order_id);
    if (order) {
      order.status = status;
      order.paymentType = payment_type;
      order.transactionTime = transaction_time;
      order.updatedAt = new Date().toISOString();
      orders.set(order_id, order);

      // Here you would typically:
      // 1. Update database
      // 2. Send email notification
      // 3. Update inventory
      // 4. Trigger fulfillment process
    }

    return NextResponse.json({
      success: true,
      message: 'Notification processed',
      orderId: order_id,
      status,
    });
  } catch (error) {
    console.error('Notification handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}