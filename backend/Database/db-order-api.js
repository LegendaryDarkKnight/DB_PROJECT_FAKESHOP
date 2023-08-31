const database = require('./database')

async function placeOrder(customerID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID
    };
    const query = ` BEGIN
                        ADD_ORDER(:customerID);
                    END;
                    `
    await database.execute(query,binds,options);
}

async function test(name){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        name: name
    };
    const query = ` BEGIN
                        DUMMY(:name);
                    END;
                    `
    await database.execute(query,binds,options);
}

module.exports = {
    placeOrder,
    test
}