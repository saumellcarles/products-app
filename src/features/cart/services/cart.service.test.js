import { describe, it, expect, vi } from 'vitest';
import { httpClient } from '../../../shared/services/http-client.js';
import { API_ENDPOINTS } from '../../../shared/constants/api/products.js';
import { addProductToCart } from './cart.service.js';

vi.mock('../../../shared/services/http-client.js', () => ({
  httpClient: { post: vi.fn() },
}));

describe('cart.service', () => {
  it('posts the product id, color code and storage code to the cart endpoint', async () => {
    httpClient.post.mockResolvedValue({ count: 2 });

    const result = await addProductToCart({ id: 'abc', colorCode: 1000, storageCode: 2000 });

    expect(httpClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CART, {
      id: 'abc',
      colorCode: 1000,
      storageCode: 2000,
    });
    expect(result).toEqual({ count: 2 });
  });
});
