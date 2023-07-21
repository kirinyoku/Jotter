import ky from 'ky';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');

  if (!href) {
    return new Response('Invalid href', {
      status: 400,
    });
  }

  const res: string = await ky.get(href).json();

  const titleMatch = res.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  const descriptionMatch = res.match(/<meta name="description" content="(.*?)"/);
  const description = descriptionMatch ? descriptionMatch[1] : '';

  const imageMatch = res.match(/<meta property="og:image" content="(.*?)"/);
  const imageUrl = imageMatch ? imageMatch[1] : '';

  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    }),
  );
}
