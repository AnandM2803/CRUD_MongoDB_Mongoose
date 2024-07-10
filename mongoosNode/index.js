const mongoose = require('mongoose');

// const  = 'mongodb://127.0.0.1:27017/shop';//
const uri="mongodb+srv://AnandKumarM:A1meena@cluster0.0v4azdl.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
// connect to mongoDB
mongoose.connect(uri);

// create schema
const productSchema = new mongoose.Schema({
    fruit: String,
    size: String,
    color: String
});
const Product = mongoose.model('Product', productSchema, 'product');

const data1={
    fruit:'Chiku',
    size:'Small',
    color:'Light Brown'
}
const main = async () => {
    try {
        // console.log('Mongoose connection state:', mongoose.connection.readyState);
        // 1) read data all and with some filter 
        const allProducts = await Product.find();
        console.log('All Products:', allProducts);
        const data = await Product.find({ fruit: 'Apple' });
        console.log('Found data:', data);
        // 2) insert data
        const insertdata=await Product.create(data1);
        console.log('inserted data is:',insertdata);
        // 3) uodate data 
        const updateData=await Product.findOneAndUpdate({fruit:"Chiku",size:'Small'},{$set :{size:'Large'}},{new:true})
        console.log('upadted Data :',updateData)
        // 4) delete data 
        const deleteData=await Product.findOneAndDelete({
            fruit:'Chiku',size:'Large'
        },{new :true})
        console.log('deletedData :',deleteData,'Deleted Successfully')
    } catch (e) {
        console.error('Error fetching data:', e);
    } finally {
        mongoose.connection.close();
        console.log('Connection closed');
    }
};


main();
