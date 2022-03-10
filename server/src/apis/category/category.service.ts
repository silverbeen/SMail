import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryList } from '../../entities/CategoryList';
import { Content } from '../../entities/Content';

// 실질적인 로직 짜는 곳

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryList)
    private readonly categoryListRepository: Repository<CategoryList>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  public async getCategoryListAll() {
    const categoryTitleList = await this.categoryListRepository.find();

    const categoryList = await Promise.all(
      categoryTitleList.map(async (category) => {
        const test = {
          title: category.title,
          list: [],
        };
        // .createQueryBuilder('category')
        // .innerJoin('category.contents', 'content')
        // .where('category.category_id = :id ', {
        //   id: category.categoryListId,
        // })
        // .addSelect('COUNT(*) as total')
        // .groupBy('category.field_id')
        // .getRawMany();
        const categories = await this.categoryRepository.find({
          where: {
            categoryId: category.categoryListId,
          },
        });

        categories.map(async (content) => {
          const contentCnt = await this.contentRepository
            .createQueryBuilder('content')
            .where('content.field_id = :id', { id: content.fieldId })
            .getCount();

          // content.('contentCnt', contentCnt);
          console.log(contentCnt);
        });

        test.list = categories;

        return test;
      }),
    );

    return categoryList;
  }
}
