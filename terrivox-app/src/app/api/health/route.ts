import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { 
      success: true, 
      message: 'El Backend de Terrivox está online de forma totalmente segregada del Frontend.', 
      environment: process.env.NEXT_PUBLIC_APP_ENV 
    },
    { status: 200 }
  );
}
