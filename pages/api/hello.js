export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const resp = await fetch(
        'https://model-7qk4ng2w.api.baseten.co/development/predict',
        {
          method: 'POST',
          headers: {
            Authorization: `Api-Key ${process.env.NEXT_PUBLIC_BASETEN}`,
          },
          body: JSON.stringify({
            "workflow_values": {
              "negative_prompt": "blurry, text, low quality",
              "positive_prompt": "An igloo on a snowy day, 4k, hd",
              "controlnet_image": "https://storage.googleapis.com/logos-bucket-01/baseten_logo.png"
            }
          }),
        }
      );
      const data = await resp.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
