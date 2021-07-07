/**
 * Gets a random number between [min, max)
 * @param min lower bound
 * @param max upper bound
 * @return {number}
 */
const random = (min, max) => {
    return min + Math.floor(Math.random() * (max - min));
};

const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
