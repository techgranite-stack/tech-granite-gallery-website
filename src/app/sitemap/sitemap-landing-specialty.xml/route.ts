import { createBifurcatedSitemapResponse } from '@/lib/landing/sitemaps';

export async function GET() {
  return createBifurcatedSitemapResponse('specialty');
}
