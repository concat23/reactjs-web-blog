// src/configs/nailPolishDetailConfig.js

const nailPolishDetailConfig = (t, brands = [], categories = []) => [
  { name: 'name', label: t('nailPolish.productName'), type: 'text' },
  {
    name: 'images_urls',
    label: t('nailPolish.images'),
    type: 'file', // hoặc 'upload' nếu component hỗ trợ
    multiple: true,
    accept: 'image/*', // chỉ cho phép file ảnh
    upload: true // tuỳ thuộc vào component xử lý
},
  { name: 'code', label: t('nailPolish.productCode'), type: 'text' },
  {
    name: 'brand_id',
    label: t('nailPolish.brand'),
    type: 'select',
    options: brands.map(b => ({ value: b.id, label: b.name })),
  },
  {
    name: 'category_id',
    label: t('nailPolish.category'),
    type: 'select',
    options: categories.map(c => ({ value: c.id, label: c.name })),
  },
  { name: 'color_code', label: t('nailPolish.colorCode'), type: 'text' },
  { name: 'color_name', label: t('nailPolish.colorName'), type: 'text' },
  {
    name: 'finish_type',
    label: t('nailPolish.finishType'),
    type: 'select',
    options: [
      { value: 'shiny', label: t('nailPolish.finishTypes.shiny') },
      { value: 'matte', label: t('nailPolish.finishTypes.matte') },
      { value: 'glitter', label: t('nailPolish.finishTypes.glitter') },
    ],
  },
  { name: 'volume_ml', label: t('nailPolish.volumeMl'), type: 'number' },
  { name: 'dry_time_seconds', label: t('nailPolish.dryTimeSeconds'), type: 'number' },
  { name: 'durability_days', label: t('nailPolish.durabilityDays'), type: 'number' },
  { name: 'is_vegan', label: t('nailPolish.isVegan'), type: 'boolean' },
  { name: 'is_cruelty_free', label: t('nailPolish.isCrueltyFree'), type: 'boolean' },
  { name: 'is_toxic_free', label: t('nailPolish.isToxicFree'), type: 'boolean' },
  { name: 'price_vnd', label: t('nailPolish.priceVnd'), type: 'currency' },
  { name: 'currency', label: t('nailPolish.currency'), type: 'text' },
  { name: 'manufacture_date', label: t('nailPolish.manufactureDate'), type: 'date' },
  { name: 'expiry_date', label: t('nailPolish.expiryDate'), type: 'date' },
  { name: 'barcode', label: t('nailPolish.barcode'), type: 'text' },
  { name: 'usage_instructions', label: t('nailPolish.usageInstructions'), type: 'textarea' },
  { name: 'warning_notes', label: t('nailPolish.warningNotes'), type: 'textarea' },
  { name: 'storage_instructions', label: t('nailPolish.storageInstructions'), type: 'textarea' },
];

export default nailPolishDetailConfig;
