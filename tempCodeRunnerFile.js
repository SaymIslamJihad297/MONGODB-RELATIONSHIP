ync()=>{
    let user1 = new customers({
        name: "Saym Islam Jihad",
    })
    let order1 = await Products.findOne({item: "Mango"});
    let order2 = await Products.findOne({item: "mix fruits"});
    user1.order.push(order1);
    user1.order.push(order2);

    let result = await user1.save();
    console.log(result);
}

addCustomer();