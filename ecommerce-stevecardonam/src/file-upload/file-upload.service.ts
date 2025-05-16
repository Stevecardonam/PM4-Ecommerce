import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUpLoadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }
    const uploadResponse = await this.fileUpLoadRepository.uploadImage(file);

    await this.productsRepository.update(product.id, {
      imgUrl: uploadResponse?.url,
    });
    return 'Image uploaded successfully';
  }
}
