import { Injectable } from '@nestjs/common';


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};
@Injectable()
export class ProductRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with adjustable DPI.',
      price: 25.99,
      stock: true,
      imgUrl: 'https://example.com/images/wireless-mouse.jpg',
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches.',
      price: 89.49,
      stock: true,
      imgUrl: 'https://example.com/images/mechanical-keyboard.jpg',
    },
    {
      id: 3,
      name: 'Gaming Headset',
      description: 'Surround sound gaming headset with noise-cancelling mic.',
      price: 59.95,
      stock: false,
      imgUrl: 'https://example.com/images/gaming-headset.jpg',
    },
    {
      id: 4,
      name: 'USB-C Charger',
      description: 'Fast-charging 65W USB-C power adapter.',
      price: 34.99,
      stock: true,
      imgUrl: 'https://example.com/images/usb-c-charger.jpg',
    },
    {
      id: 5,
      name: '4K Monitor',
      description: '27-inch 4K UHD monitor with IPS panel.',
      price: 299.99,
      stock: true,
      imgUrl: 'https://example.com/images/4k-monitor.jpg',
    },
    {
      id: 6,
      name: 'Webcam 1080p',
      description: 'Full HD webcam with built-in microphone.',
      price: 44.5,
      stock: false,
      imgUrl: 'https://example.com/images/webcam-1080p.jpg',
    },
    {
      id: 7,
      name: 'Portable SSD 1TB',
      description: 'High-speed USB 3.1 portable SSD with 1TB capacity.',
      price: 129.0,
      stock: true,
      imgUrl: 'https://example.com/images/portable-ssd.jpg',
    },
    {
      id: 8,
      name: 'Bluetooth Speaker',
      description: 'Waterproof Bluetooth speaker with deep bass.',
      price: 49.99,
      stock: true,
      imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
    },
    {
      id: 9,
      name: 'Smartwatch',
      description: 'Fitness-focused smartwatch with heart rate monitor.',
      price: 149.95,
      stock: true,
      imgUrl: 'https://example.com/images/smartwatch.jpg',
    },
    {
      id: 10,
      name: 'Noise Cancelling Earbuds',
      description: 'True wireless earbuds with active noise cancellation.',
      price: 99.99,
      stock: false,
      imgUrl: 'https://example.com/images/earbuds.jpg',
    },
  ];

getAllProducts() {
    return this.products;
}

getProductById(id: number) {
    return this.products.find((product) => product.id === id);
}
}