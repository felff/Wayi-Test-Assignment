import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/actions/payload';

export async function GET(req: NextRequest) {
  const payload = await getPayloadClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '2', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const sort = searchParams.get('sort') || 'createdAt';

  try {
    const result = await payload.find({
      collection: 'products',
      pagination: true,
      page,
      limit,
      sort,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/products:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
