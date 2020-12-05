
var contractInstance;
var account = "";

$(document).ready(async function(){

  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          // ask user for permission
          await window.ethereum.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);

  }    // no need to ask for permission

  contractInstance = new web3.eth.Contract(abi, "0xb07f5a16570b6a5ba0b408f6c125a75cf9466855");
  var accounts = await window.web3.eth.getAccounts();
  account = accounts [0];

  $("#sendLock").click(function () {

    if ($("#inputAddress").val() == "0" || $("#inputAmount").val() == 0 ) {
      alert ("Please check the input data!");
    } else {
      sendLock();
  }

  });
});


//Smart contract functions
function sendLock() {

  var _Address = $("#inputAddress").val();
  var _Amount = $("#inputAmount").val();
  _Amount = web3.utils.toWei(_Amount);


  var isValid = web3.utils.isHexStrict(_Address);
  let isNum = /^\d+$/.test(_Amount.toString());

  if (_Address == "") {
    alert ("Enter a valid address!");
  } else if (! isValid) {
    alert ("The address doens't seem  to be correct. Please double check!");
  } else if (_Amount < 1) {
    alert ("Please enter a valid amount.");
  }else {

    var userPreference;

		if (confirm("send " + ($("#inputAmount").val()) + " $LOCK to " + _Address) == true) {
      contractInstance.methods.transfer(_Address, _Amount).send( {from: account, gas: 30000} )
    .then( receipt => console.log(receipt) )
			userPreference = "Transaction has been sent";
		} else {
			userPreference = "Transaction has been canceled!";
      alert (userPreference)
		}


  ;}

  }
