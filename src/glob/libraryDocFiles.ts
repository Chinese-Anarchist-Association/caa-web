export default
import.meta.glob([
    '@/views/Library/doc/**/*.pdf',
    '@/views/Library/doc/**/*.docx',
    '@/views/Library/doc/**/*.txt',
], {
    eager: true,
    query: '?url',
    import: 'default',
});