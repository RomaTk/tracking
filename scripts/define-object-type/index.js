export default (object) => {

    var name = typeof object;

    if (name === 'number') {
        return 'A';
    }
    else if (name === 'string') {
        return 'B';
    }
    else {
        return 'C';
    }
};

//числа - тип А  alert(typeof object);
//строчки - тип В
//все остальное - тип С