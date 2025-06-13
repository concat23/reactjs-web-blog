const mediaDetailConfig = (t) => [
  {
    name: 'original_name',
    label: t('media.originalName') || 'Tên gốc',
    type: 'text',
  },
  {
    name: 'public_id',
    label: t('media.publicId') || 'Public ID',
    type: 'text',
  },
  {
    name: 'url',
    label: t('media.url') || 'URL',
    type: 'link',
  },
  {
    name: 'file_type',
    label: t('media.fileType') || 'Loại file',
    type: 'text',
  },
  {
    name: 'upload_type',
    label: t('media.uploadType') || 'Loại upload',
    type: 'text',
  },
  {
    name: 'created_at',
    label: t('media.createdAt') || 'Ngày tạo',
    type: 'datetime',
  },
  {
    name: 'updated_at',
    label: t('media.updatedAt') || 'Ngày cập nhật',
    type: 'datetime',
  },
];
export default mediaDetailConfig;
