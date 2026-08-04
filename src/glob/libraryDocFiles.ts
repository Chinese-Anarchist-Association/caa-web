export default
import.meta.glob([
    '@/views/Library/doc/**/*.pdf',
    '@/views/Library/doc/**/*.docx',
    '@/views/Library/doc/**/*.txt',
    '@/views/Library/doc/**/*.md',
    '@/views/Library/doc/**/*.mdz',
], {
    eager: true,
    query: '?url',
    import: 'default',
});