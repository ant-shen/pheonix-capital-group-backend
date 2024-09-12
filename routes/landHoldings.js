const express = require('express');
const LandHolding = require('../models/LandHolding');
const router = express.Router();

// Get all land holdings
router.get('/', async (req, res) => {
  try {
    const landHoldings = await LandHolding.find();
    res.json(landHoldings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//get land holding by id 
router.get('/:id', async (req,res) => {
  try {
    const landHolding = await LandHolding.findById(req.params.id).populate('owner');
    if(!landHolding) {
      return res.status(404).json({msg: 'Land holding not found'});
    }
    res.status(200).json(landHolding)
  } catch (error) {
    res.status(500).json({message: 'Error retrieving land holding', error});
  }
});

//update a land holding by specific id
router.put('/:id', async (req, res) => {
  try {
    const landHolding = await LandHolding.findById(req.params.id);
    if (!landHolding) {
      return res.status(404).send('Land holding not found');
    }

    const { legalEntity, netMineralAcres, mineralOwnerRoyalty, section, township, range, titleSource } = req.body;

    // Update fields
    landHolding.legalEntity = legalEntity;
    landHolding.netMineralAcres = netMineralAcres;
    landHolding.mineralOwnerRoyalty = mineralOwnerRoyalty;
    landHolding.section = section;
    landHolding.township = township;
    landHolding.range = range;
    landHolding.titleSource = titleSource;

    // Auto-generate sectionName
    landHolding.sectionName = `${section}-${township}-${range}`;

    // Save the updated document
    const updatedLandHolding = await landHolding.save();
    res.status(200).json(updatedLandHolding);
  } catch (error) {
    console.error('Error updating land holding:', error);
    res.status(400).send('Error updating land holding');
  }
}); 

// Create a new land holding
router.post('/', async (req, res) => {
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
    const landHolding = new LandHolding({
      name,
      owner,
      legalEntity,
      netMineralAcres,
      mineralOwnerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource,
    });

    await landHolding.save();
    res.json(landHolding);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a land holding
router.delete('/:id', async (req, res) => {
  try {
    const landHolding = await LandHolding.findById(req.params.id);
    if (!landHolding) {
      return res.status(404).json({ msg: 'Land Holding not found' });
    }

    await landHolding.remove();
    res.json({ msg: 'Land Holding removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
