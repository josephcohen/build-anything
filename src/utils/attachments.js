export function createImageAttachment(file) {
  return {
    id: crypto.randomUUID(),
    type: 'image',
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  }
}

export function createFileAttachment(file) {
  return {
    id: crypto.randomUUID(),
    type: 'file',
    name: file.name,
    size: file.size,
  }
}

export function createUrlAttachment(url) {
  return {
    id: crypto.randomUUID(),
    type: 'url',
    name: url,
    url,
  }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
