function sum(num) {
    var sum = num;

    function func(b) {
        if(b == undefined) {
            return sum;
        }
        sum += b;
        return func;
    }

    return func;
}