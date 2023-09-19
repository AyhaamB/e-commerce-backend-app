const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        as: 'product_tags',
        attributes: ['product_name', 'price', 'stock'],
      },
    ],
  });

  res.status(200).json(tags);
});

router.get('/:id', async (req, res) => {
  const tagId = req.params.id;

  const tag = await Tag.findByPk(tagId, {
    include: [
      {
        model: Product,
        as: 'product_tags',
        attributes: ['product_name', 'price', 'stock'],
      },
    ],
  });

  res.status(200).json(tag);
});

router.post('/', async (req, res) => {
  const { tag_name } = req.body;

  const newTag = await Tag.create({ tag_name });

  res.status(201).json(newTag);
});

router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  const { tag_name } = req.body;

  const tag = await Tag.findByPk(tagId);

  if (tag) {
    tag.tag_name = tag_name;
    await tag.save();
  }

  res.status(200).json(tag);
});

router.delete('/:id', async (req, res) => {
  const tagId = req.params.id;

  const tag = await Tag.findByPk(tagId);

  if (tag) {
    await tag.destroy();
  }

  res.status(204).end();
});

module.exports = router;
