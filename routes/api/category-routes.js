const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((catData) => {
    res.json(catData);
  });
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId, {
      include: Product,
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;

    const newCategory = await Category.create({ category_name });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;

  const category = await Category.findByPk(categoryId);

  if (category) {
    category.category_name = category_name;
    await category.save();
  }

  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  const category = await Category.findByPk(categoryId);

  if (category) {
    await category.destroy();
  }

  res.status(204).end();
});

module.exports = router;
