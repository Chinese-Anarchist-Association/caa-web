export default
import.meta.glob([
    '@/views/Posters/img/**/*.enc',
], {
    eager: true,
    query: '?url',
    import: 'default',
});