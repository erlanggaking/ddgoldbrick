import { NextRequest, NextResponse } from 'next/server';

// Midtrans Payment Gateway Integration
// Replace with actual Midtrans credentials

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-demo-key';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-demo-key';
const MIDTRANS_BASE_URL = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/v1'
  : 'https://app.sandbox.midtrans.com/snap/v1';

// In-memory order storage (replace with database in production)
const orders = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      items,
      customerDetails,
      shippingDetails,
      grossAmount,
    } = body;

    // Validate required fields
    if (!orderId || !items || !customerDetails || !grossAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare Midtrans transaction details
    const itemDetails = items.map((item: any) => ({
      id: item.product.setNumber || item.id,
      price: item.product.price,
      quantity: item.quantity,
      name: item.product.setName.substring(0, 50), // Midtrans max 50 chars
    }));

    // Add shipping as item if provided
    if (shippingDetails?.cost) {
      itemDetails.push({
        id: 'SHIPPING',
        price: shippingDetails.cost,
        quantity: 1,
        name: 'Shipping Cost',
      });
    }

    const transactionData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        billing_address: {
          first_name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          city: customerDetails.city,
          postal_code: customerDetails.postalCode,
          country_code: 'IDN',
        },
        shipping_address: {
          first_name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: shippingDetails?.address || customerDetails.address,
          city: shippingDetails?.city || customerDetails.city,
          postal_code: shippingDetails?.postalCode || customerDetails.postalCode,
          country_code: 'IDN',
        },
      },
      enabled_payments: [
        'bca_va', 'bni_va', 'bri_va', 'mandiri_va',
        'gopay', 'shopeepay', 'dana', 'ovo',
        'credit_card', 'bca_klikpay', 'bca_klikbca',
      ],
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order-success`,
        error: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order-error`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order-pending`,
      },
    };

    // If using real Midtrans API
    if (MIDTRANS_SERVER_KEY !== 'SB-Mid-server-demo-key') {
      const response = await fetch(`${MIDTRANS_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
        },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();

      // Store order
      orders.set(orderId, {
        ...transactionData,
        snapToken: data.token,
        redirectUrl: data.redirect_url,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        token: data.token,
        redirectUrl: data.redirect_url,
        orderId,
      });
    }

    // Mock response for development
    const mockToken = `mock-snap-token-${orderId}-${Date.now()}`;
    const mockRedirectUrl = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`;

    // Store order
    orders.set(orderId, {
      ...transactionData,
      snapToken: mockToken,
      redirectUrl: mockRedirectUrl,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      token: mockToken,
      redirectUrl: mockRedirectUrl,
      orderId,
      clientKey: MIDTRANS_CLIENT_KEY,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}

// Get payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // If using real Midtrans API
    if (MIDTRANS_SERVER_KEY !== 'SB-Mid-server-demo-key') {
      const response = await fetch(
        `https://api${process.env.MIDTRANS_IS_PRODUCTION === 'true' ? '' : '.sandbox'}.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
          },
        }
      );
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Mock response
    const order = orders.get(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderId,
        status: order.status,
        grossAmount: order.transaction_details.gross_amount,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Payment status API error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}