const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  }).then((catData) => {
    res.json(catData);
  });
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;

    // Find the category by its `id` value and include its associated Products
    const category = await Category.findByPk(categoryId, {
      include: Product, // Assuming there's a "Product" model associated with the "Category" model
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Get the category name from the request body
    const { category_name } = req.body;

    // Create a new category in the database
    const newCategory = await Category.create({ category_name });

    // Send a 201 Created response with the created category
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
