const getDate = () => {
    const d = new Date();
    return d.getFullYear() + '-' +
        (d.getMonth() + 1).fix() + '-' +
        d.getDate().fix();
}

const getTime = () => {
    const d = new Date();
    return d.getHours() + ':' +
        d.getMinutes().fix() + ':' +
        d.getSeconds().fix();
}

Number.prototype.fix = function () {
    return this >= 10 ? this : "0" + this;
}

module.exports = [getDate, getTime];