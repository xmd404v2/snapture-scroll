import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const serverPort = parseInt(process.env.AGENT_SERVER_PORT ?? '3000');

    // TODO: Get multiple agents
    const { agents } = await (await fetch(`http://localhost:${serverPort}/agents`)).json();
    const agentId = agents[0].id;

    // TODO: Get text from frontend
    const response = await fetch(`http://localhost:${serverPort}/${agentId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Hi',
        userId: 'user',
        userName: 'User',
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching response:', error);
  }
}
