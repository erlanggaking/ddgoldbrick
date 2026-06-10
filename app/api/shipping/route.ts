import { NextRequest, NextResponse } from 'next/server';

// RajaOngkir API integration for real-time shipping cost calculation
// This is a mock implementation - replace with actual RajaOngkir API key

const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY || 'demo';
const RAJAONGKIR_BASE_URL = 'https://api.rajaongkir.com/starter';

// Mock shipping data for development
const mockShippingRates = {
  jne: {
    reg: { name: 'JNE Regular', etd: '2-3 hari', rate: 15000 },
    yes: { name: 'JNE YES', etd: '1 hari', rate: 35000 },
    oke: { name: 'JNE OKE', etd: '3-5 hari', rate: 10000 },
  },
  jnt: {
    reg: { name: 'J&T Regular', etd: '2-3 hari', rate: 14000 },
    ez: { name: 'J&T EZ', etd: '1-2 hari', rate: 25000 },
  },
  sicepat: {
    reg: { name: 'SiCepat Regular', etd: '2-3 hari', rate: 13000 },
    best: { name: 'SiCepat BEST', etd: '1 hari', rate: 28000 },
    gokil: { name: 'SiCepat GOKIL', etd: 'Same day', rate: 45000 },
  },
  pos: {
    reg: { name: 'POS Regular', etd: '3-5 hari', rate: 12000 },
    eks: { name: 'POS Express', etd: '1-2 hari', rate: 22000 },
  },
  tiki: {
    reg: { name: 'TIKI Regular', etd: '2-4 hari', rate: 14000 },
    eco: { name: 'TIKI ECO', etd: '3-5 hari', rate: 9000 },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, weight, courier } = body;

    // Validate required fields
    if (!origin || !destination || !weight) {
      return NextResponse.json(
        { error: 'Origin, destination, and weight are required' },
        { status: 400 }
      );
    }

    // If using real RajaOngkir API
    if (RAJAONGKIR_API_KEY !== 'demo') {
      const response = await fetch(`${RAJAONGKIR_BASE_URL}/cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'key': RAJAONGKIR_API_KEY,
        },
        body: new URLSearchParams({
          origin: origin.toString(),
          destination: destination.toString(),
          weight: weight.toString(),
          courier: courier || 'jne',
        }),
      });

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Mock response for development
    const couriers = courier ? [courier] : ['jne', 'jnt', 'sicepat', 'pos', 'tiki'];
    const results: any[] = [];

    for (const c of couriers) {
      const courierData = mockShippingRates[c as keyof typeof mockShippingRates];
      if (courierData) {
        const services = Object.entries(courierData).map(([code, service]) => ({
          code: code.toUpperCase(),
          name: service.name,
          etd: service.etd,
          cost: Math.round(service.rate * (weight / 1000)),
        }));
        results.push({
          code: c.toUpperCase(),
          name: c.toUpperCase(),
          services,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        origin,
        destination,
        weight,
        currency: 'IDR',
      },
    });
  } catch (error) {
    console.error('Shipping API error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping cost' },
      { status: 500 }
    );
  }
}

// Get available cities (for RajaOngkir)
export async function GET(request: NextRequest) {
  try {
    // If using real RajaOngkir API
    if (RAJAONGKIR_API_KEY !== 'demo') {
      const response = await fetch(`${RAJAONGKIR_BASE_URL}/city`, {
        headers: {
          'key': RAJAONGKIR_API_KEY,
        },
      });
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Mock cities for development
    const mockCities = [
      { city_id: '1', province_id: '1', province: 'Bali', type: 'Kota', city_name: 'Denpasar', postal_code: '80000' },
      { city_id: '2', province_id: '2', province: 'Jawa Barat', type: 'Kota', city_name: 'Bandung', postal_code: '40000' },
      { city_id: '3', province_id: '3', province: 'Jawa Tengah', type: 'Kota', city_name: 'Semarang', postal_code: '50000' },
      { city_id: '4', province_id: '4', province: 'Jawa Timur', type: 'Kota', city_name: 'Surabaya', postal_code: '60000' },
      { city_id: '5', province_id: '5', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Pusat', postal_code: '10000' },
      { city_id: '6', province_id: '5', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Selatan', postal_code: '12000' },
      { city_id: '7', province_id: '5', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Barat', postal_code: '11000' },
      { city_id: '8', province_id: '5', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Timur', postal_code: '13000' },
      { city_id: '9', province_id: '5', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Utara', postal_code: '14000' },
      { city_id: '10', province_id: '6', province: 'DI Yogyakarta', type: 'Kota', city_name: 'Yogyakarta', postal_code: '55000' },
      { city_id: '11', province_id: '7', province: 'Sumatera Utara', type: 'Kota', city_name: 'Medan', postal_code: '20000' },
      { city_id: '12', province_id: '8', province: 'Sulawesi Selatan', type: 'Kota', city_name: 'Makassar', postal_code: '90000' },
    ];

    return NextResponse.json({
      success: true,
      data: mockCities,
    });
  } catch (error) {
    console.error('Cities API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}