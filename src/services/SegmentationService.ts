import 'dotenv/config';

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!REPLICATE_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set in .env');
}

// Replace with the actual SAM v2 model version ID (Replicate)
const SAM_VERSION = 'c87e5ffec4a4ffb18bd1a6df38bcc1f50c9e4fb6a2a9213e317dae5d65e91701';

/**
 * Calls Meta's Segment Anything Model v2 via Replicate to get a segmentation mask URL.
 * @param imageUri Local URI of the captured image.
 * @returns URL string of the mask PNG (walls, floors, large furniture).
 */
export async function getRoomMask(imageUri: string): Promise<string> {
  // Load the image as a blob
  const response = await fetch(imageUri);
  const blob = await response.blob();

  // Prepare multipart form-data
  const formData = new FormData();
  formData.append('version', SAM_VERSION);
  formData.append('input', JSON.stringify({ image: blob }));

  // Start the prediction request
  const initRes = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
    body: formData,
  });
  const initJson = await initRes.json();
  const statusUrl: string = initJson.urls.get;

  // Poll for completion
  while (true) {
    const statusRes = await fetch(statusUrl, {
      headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
    });
    const statusJson = await statusRes.json();
    if (statusJson.status === 'succeeded') {
      return statusJson.output[0] as string;
    }
    if (statusJson.status === 'failed') {
      throw new Error('Segmentation failed: ' + JSON.stringify(statusJson));
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}