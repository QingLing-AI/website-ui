import { NextRequest } from 'next/server';

import { findExpertByNameAndCertificate } from '@/services/strapi';

export async function POST(request: NextRequest) {
  try {
    const { expertName, certificateId } = await request.json();

    if (!expertName || !certificateId) {
      return Response.json({ error: 'expertName or certificateId is missing' }, { status: 400 });
    }

    const expert = await findExpertByNameAndCertificate(expertName, certificateId);

    if (expert) {
      return Response.json({
        success: true,
        expert: {
          name: expert.expertName,
          position: expert.expertPosition,
          certificateId: expert.certificateId,
        },
      });
    } else {
      return Response.json({
        success: false,
        message: 'Certificate not found',
      });
    }
  } catch (error) {
    console.error('Error searching expert:', error);
    return Response.json({ error: 'Error searching expert' }, { status: 500 });
  }
}
