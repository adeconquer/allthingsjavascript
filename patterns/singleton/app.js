const singleton = (function() {
    let instance;

    function createInstance() {
        const object = new Object({ name: 'Olu' });
        return object;
    }
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance
        }
    }
})()

const instanceA = singleton.getInstance();
const instanceB = singleton.getInstance();

console.log(instanceA === instanceB)