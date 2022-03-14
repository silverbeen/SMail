export interface CategoryListType {
  title: string;
  list: [
    {
      fieldId: number;
      categoryId: number;
      fieldName: string;
    }
  ];
}
