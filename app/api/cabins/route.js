import { getCabins } from '@/app/_lib/data-service';

export async function GET(request, { params }) {
  try {
    const cabins = await getCabins();

    return Response.json(cabins);
  } catch (error) {
    return Response.json(
      { error: 'Cabin not found' },
      { status: 404 }
    );
  }
}
