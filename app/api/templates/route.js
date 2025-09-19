export async function GET() {
  // In a real app, this would fetch from a database
  return Response.json({ 
    templates: [
      { id: 1, name: 'Newsletter Template', type: 'single-column' },
      { id: 2, name: 'Action Alert', type: 'header-footer' },
      { id: 3, name: 'Fundraising Appeal', type: 'two-column' },
    ] 
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    // In a real app, this would save to a database
    return Response.json({ 
      success: true, 
      message: 'Template saved successfully',
      id: Date.now() // Simulate generated ID
    })
  } catch (error) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}