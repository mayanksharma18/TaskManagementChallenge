import { imageToBase64 } from './ImageIntoBase64';

describe('imageToBase64', () => {
  it('converts an image file to base64', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    try {
      const result = await imageToBase64(file);
      expect(result).toMatch(/^data:image\/png;base64,/)
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  it('rejects when no image file is provided', async () => {
    try {
      await imageToBase64(null);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('No image file provided.');
    }
  });
});
