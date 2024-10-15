import { join } from "path";

interface ProductData {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export function mapData(data: any): ProductData[] {
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format, expected Array.");
  }

  return data.map<ProductData>((obj) => {
    return {
      image: {
        thumbnail: typeof obj.image.thumbnail === 'string' ? `${join(process.env.PUBLIC_URL, obj.image.thumbnail)}` : '',
        mobile: typeof obj.image.mobile === 'string' ? `${join(process.env.PUBLIC_URL, obj.image.mobile)}` : '',
        tablet: typeof obj.image.tablet === 'string' ? `${join(process.env.PUBLIC_URL, obj.image.tablet)}` : '',
        desktop: typeof obj.image.desktop === 'string' ? `${join(process.env.PUBLIC_URL, obj.image.desktop)}` : '',
      },
      name: typeof obj.name === 'string' ? obj.name : '',
      category: typeof obj.category === 'string' ? obj.category : '',
      price: typeof obj.price === 'number' ? obj.price : ''
    }
  })
}

export default ProductData;