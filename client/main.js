Moralis.initialize("ITLiPJMIfqWc9WeyQ2ASdrRijMyo6mFdOP2hFNsi"); // Application id from moralis.io
Moralis.serverURL = "https://ewmpiy0ejpb6.moralisweb3.com:2053/server"; //Server url from moralis.io
CONTRACT_ADDRESS  = "0xFFB98259D5FC05DC91641ed54160560Eb8cAA1c4";
CONTRACT_ACCOUNT  = "0xAEb4c4A85948A890588A2881794E693386b29f38";

async function init() {
    try {
        let user = Moralis.Web3.authenticate();
        if(!user) {
            $('#login_button').click(async () => {
                user = await Moralis.Web3.authenticate();
            })
        }

        if(user) {
            render_game();
        } else {
            alert('need authentication !');
        }

        
        
    } catch (error) {
        console.log(error);
    }
}

async function render_game() {
    alert("User logged in");
    $('#login_button').hide();
    // render proper
    let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    const rpcURL = "http://localhost:7545";
    const web3 = new Web3(rpcURL);
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    let array = await contract.methods.getAllTokensForUser(CONTRACT_ACCOUNT).call({from : CONTRACT_ACCOUNT});

    let data = await contract.methods.getTokenDetails(petId).call({from : ethereum.selectedAddress});
    renderPer(petId, data);
    $('#game').show();
}

function renderPer(id, data) {
    $('#pet_id').html(id);
    $('#pet_damage').html(data.damage);
    $('#pet_magic').html(data.magic);
    $('#pet_endurance').html(data.endurance);

    let deathTime = new Date((parseInt(data.lastMeal) + parseInt(data.endurance))*1000);
    let now = new Date();
    if(now > deathTime) {
        deathTime = "<b>DEAD</b>"
    }
    $('#pet_starvation_time').html(deathTime);
    $('#feed_button').attr('data-pet-id', id);

}

function getAbi() {
    return new Promise( (res) => {
        $.getJSON("../build/contracts/Token.json", ((json) => {
            res(json.abi);
        }))

    })
}

async function feed(petId) {
    let abi = await getAbi();
    const rpcURL = "http://localhost:7545";
    const web3 = new Web3(rpcURL);
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    
    
    contract.methods.feed(petId).send({from : CONTRACT_ACCOUNT}).on(
        "receipt", (() => {
            render_game();
        })
    );
    
}

$('#feed_button').click(() => {
    let petId = $('#feed_button').attr('data-pet-id');
    feed(petId);

});


init();
window.location.href = 'round1.html';




