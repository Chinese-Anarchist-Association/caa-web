export default
import.meta.glob([
    '@/assets/img/**/*.enc',
], {
    eager: true,
    query: '?url',
    import: 'default',
});