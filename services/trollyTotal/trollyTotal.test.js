const { calculateTrolly } = require('./trollyTotal');
const axios = require('axios');

jest.mock('axios');

const mockedData = {
  products: [
    {
      name: 'Test Product A',
      price: 99.99,
    },
  ],
  specials: [
    {
      quantities: [
        {
          name: 'Test Product A',
          quantity: 5,
        },
      ],
      total: 200,
    },
  ],
  quantities: [
    {
      name: 'Test Product A',
      quantity: 5,
    },
  ],
};

describe('service calculate trolly', () => {
  afterAll(() => axios.Restore());
  it('fetches successfully data from an API', async () => {
    const data = { data: 200 };
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    try {
      const result = await calculateTrolly(mockedData);
      expect(result).toEqual(200);
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    try {
      const result = await calculateTrolly(mockedData);
      expect(result).toEqual(200);
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: Service failed]`);
    }
  });
});
