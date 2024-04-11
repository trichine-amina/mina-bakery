function updateprice(event){

const totalpriceelement= document.getElementById("totalprice");
const newprice = parseFloat(document.getElementById("cake-order").value );
const quantity = parseInt(document.getElementById("quantity").value);
const totalprice = newprice * quantity;
totalpriceelement.textContent = `Total price: ${totalprice.toString()} DA`;
};

document.getElementById("cake-order").addEventListener("change",updateprice);
document.getElementById("quantity").addEventListener("change",updateprice);

document.getElementById("order").addEventListener("submit" ,(event) =>alert("your order has been submitted.")  );
