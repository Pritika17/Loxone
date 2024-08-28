import { NextResponse } from 'next/server';
import LxCommunicatorMock from '@/lib/lxCommunicatorMock';

const miniserver = new LxCommunicatorMock({
  host: process.env.LOXONE_HOST!,
  username: process.env.LOXONE_USERNAME!,
  password: process.env.LOXONE_PASSWORD!,
});

export async function GET() {
  try {
    await miniserver.connect();
    const status = await miniserver.send('jdev/sps/io/Light/state');
    await miniserver.close();
    return NextResponse.json({ status: status.LL.value });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to get light status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { action } = await request.json();
  try {
    await miniserver.connect();
    await miniserver.send(`jdev/sps/io/Light/${action}`);
    const status = await miniserver.send('jdev/sps/io/Light/state');
    await miniserver.close();
    return NextResponse.json({ status: status.LL.value });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to toggle light' }, { status: 500 });
  }
}