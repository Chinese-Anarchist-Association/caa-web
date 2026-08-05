export default
import.meta.glob([
    '@/views/Library/doc/**/*.pdf',
    '@/views/Library/doc/**/*.docx',
    '@/views/Library/doc/**/*.txt',
    '@/views/Library/doc/**/*.md',
    '@/views/Library/doc/**/*.mdz',
    '@/views/Library/doc/**/*.enc',
    '@/views/Library/doc/**/*.enc.part-*',
], {
    eager: true,
    query: '?url',
    import: 'default',
});