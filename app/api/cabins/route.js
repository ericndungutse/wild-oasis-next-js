import { getCabins } from '@/app/_lib/data-service';
import { revalidatePath } from 'next/cache';

export async function GET(request, { params }) {
  try {
    revalidatePath('/api/cabins');
    const cabins = await getCabins();

    console.log(cabins);
    return Response.json(cabins);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: 'Cabin not found' },
      { status: 404 }
    );
  }
}
