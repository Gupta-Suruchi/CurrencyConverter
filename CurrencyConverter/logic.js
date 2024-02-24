const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for (let select of dropdowns){
    for(let currcode in countryList){
        let options = document.createElement("option");
        options.innerText = currcode;
        options.value = currcode;
        if(select.name === "from" && currcode === "USD")
        {
            options.selected = "selected";
        }else if(select.name === "to" && currcode === "USD")
        {
            options.selected = "selected";
        }
        select.append(options);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateEXCrate = async() => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    const url = `${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(rate);
};

const updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newimg = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}


window.addEventListener("load", ()=>{
    updateEXCrate();
});
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateEXCrate(); 
});