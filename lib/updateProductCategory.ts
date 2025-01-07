'use server'

type CategoryIdsProps = {
  categories: OnlySelectIdProps[];
}

type OnlySelectIdProps = {
  id: number;
}

export default async function updateProductCategory(prisma: any, productId: number, selectedCategoryId: number) {
  const existingCategories: CategoryIdsProps = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      categories: {
        select: { id: true },
      },
    },
  });

  const existingCategoryIds = existingCategories.categories.map(c => c.id);
  const newCategoryIds = [selectedCategoryId]; // 更新後のカテゴリID
  const categoriesToDisconnect: number[] = existingCategoryIds.filter(id => !newCategoryIds.includes(id));
  const categoriesToConnect: number[] = newCategoryIds.filter(id => !existingCategoryIds.includes(id));

  return { categoriesToConnect, categoriesToDisconnect }
}