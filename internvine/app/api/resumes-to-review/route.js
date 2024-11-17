// app/api/resumes-for-review/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const resumes = [
    { id: 1, name: 'John Doe', experience: 3, fileUrl: '/path/to/resume1.pdf' },
    { id: 2, name: 'Jane Smith', experience: 5, fileUrl: '/path/to/resume2.pdf' },
  ];
  
  return NextResponse.json(resumes);
}