const mongoose = require('mongoose');
const {Schema} = mongoose;
main().then(()=>{
    console.log("Server Connected");
}).catch((err)=>{
    console.log(err);
})

const productsSchema = Schema({
    item: String,
    price: Number
})

const Products = mongoose.model("Products", productsSchema);

// const addUser = async()=>{
//     let res = await Products.insertMany([
//         {item: "Mango", price: 100},
//         {item: "Banana", price: 200},
//         {item: "mix fruits", price: 500}
//     ])
//     console.log(res);
// }

// addUser();

const customersSchema = new Schema({
    name: String,
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products"
        }
    ]
})

customersSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.order.length){
        let result = await Products.deleteMany({ _id: {$in: customer.order }});
        console.log("called");
        console.log(result);
    }
})

const customers = mongoose.model("customers", customersSchema);

// const addCustomer = async()=>{
//     let user1 = new customers({
//         name: "Saym Islam Jihad",
//     })
//     let order1 = await Products.findOne({item: "Mango"});
//     let order2 = await Products.findOne({item: "mix fruits"});
//     user1.order.push(order1);
//     user1.order.push(order2);

//     let result = await user1.save();
//     console.log(result);
// }

// addCustomer();


const delCust = async()=>{
    let data = await customers.findByIdAndDelete("67811b97a9e9dfae7999fed1");
    console.log(data);
}

delCust();

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/onetomany');
}