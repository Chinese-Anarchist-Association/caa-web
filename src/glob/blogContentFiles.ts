export default
import.meta.glob([
    '@/views/Blog/content/**/*.jpg',
    '@/views/Blog/content/**/*.png',
    '@/views/Blog/content/**/*.md',
    '@/views/Blog/content/**/*.mdz',
    '@/views/Blog/content/**/*.enc',
], {
    eager: true,
    query: '?url',
    import: 'default',
});