// login inputs
const welcomeGreetings = document.querySelector('.welcome');
const userInput = document.querySelector('.login__input--user');
const userPin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
// balance
const currentBalance = document.querySelector('.balance__value');
// transactions
const transactionHistory = document.querySelector('.movements');
const transactionRow = document.querySelector('.movements__row');
const transactionDate = document.querySelector('.movements__date');
const transactionAmount = document.querySelector('.movements__value');
const deposit = document.querySelector('.movements__type--deposit');
const withdrawal = document.querySelector('.movements__type--withdrawal');
const visual = document.querySelector('.app');


// summary
const transactionsIn = document.querySelector('.summary__value--in');
const transactionsOut = document.querySelector('.summary__value--out');
const transactionsInterest = document.querySelector('.summary__value--interest');
// operations transfers
const transferInputUsername = document.querySelector('.form__input--to');
const transferInputAmount = document.querySelector('.form__input--amount');
const transferBtn = document.querySelector('.form__btn--transfer');
// loan
const loanAmount = document.querySelector('.form__input--loan-amount');
const loanBtn = document.querySelector('.form__btn--loan');
// close
const confirmUserClose = document.querySelector('.form__input--user');
const confirmPinClose = document.querySelector('.form__input--pin');
const closeBtn = document.querySelector('.form__btn--close');


const alamin = {
 fullname: 'Ajayi Alamin Tyroon',
 transactions : [200, -140, 300, -600 , 2000],
 pin: 1111,
interest: 1.4,
};

const franklyn = {
 fullname: 'Nwaigwe Franklyn Izuchukwu',
 transactions : [500, -190, 200, -100 , 1000],
 pin: 1220,
 interest: 1.3,
 
};

const ayo = {
 fullname: 'Olayinde Ayomide Ghost',
 transactions : [900, -200, 70, -200 , 3000],
 pin: 1111,
 interest: 1.4,
}
// console.log();

//  generateUsername
  const generateUsername = function(value){
    const username = value.fullname.toLowerCase().split(" ").map(function(element){
    return element[0];}).join('').toUpperCase();
    return username;
  };
console.log(generateUsername(alamin));

const accounts = [alamin ,franklyn ,ayo];

console.log(alamin); 
console.log(franklyn); 
// addUsername FOR ALL ACCOUNTS
  const addUsername = accounts.forEach(function(value){
    value.username = generateUsername(value);
  })
// addUsername FOR ONE ACCOUNTS
//   const addUsername = function(acct){
//     acct.username = generateUsername(acct);
//   }
// console.log(addUsername(alamin));

// the new object with the username
console.log(alamin); 
console.log(franklyn); 

let type ;

const displayTransaction = function(movements){
    movements.forEach(function(value, i , arr){
    if(value < 0 ){
      type = 'withdrawal'; 
      }else{
        type = 'deposit';
      };
      const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value}€</div>
          </div>
        `;
    transactionHistory.insertAdjacentHTML('afterbegin', html);

    });
};

 const calcSummary = function(transaction){
    const interest = transaction
      .filter(function(value , i){
        return (value > 0);})
      .reduce(function(acc , cur ){
        return (acc + cur)* 1.2/ 100
        }, 0)
    transactionsInterest.textContent = `${interest}€`;

    const amountIn = transaction
      .filter(function(value , i){
        return (value > 0);})
      .reduce(function(acc , cur ){
        return acc + cur
        })
    transactionsIn.textContent =`${amountIn}€`;

  
    const amountOut = transaction
      .filter(function(value , i){
        return (value < 0);})
      .reduce(function(acc , cur ){
        return acc + cur
        })
    transactionsOut.textContent = `${amountOut}€`;

    const balance = transaction
      .reduce(function(acc , cur ){
        return acc + cur
        }, 0)
    currentBalance.textContent = `${balance}€`;
}

let login;

loginBtn.addEventListener('click' , function(e){
  e.preventDefault()
  // the use of the prevent default is to prevent the page from refreshing
  // the reason it refreshes is because it is a button in form element in html and the default is to
  // refresh the page when the button is clicked but we dont want it to refresh 
  login = accounts.find(function(acct){
  return acct.username === userInput.value
  })
  console.log(login);
  if(login.pin === Number(userPin.value)){
  visual.classList.add('visual')
  }
  // WELCOME
  welcomeGreetings.textContent = `Welcome ${login.fullname.split(' ')[0]}`
  // DISPLAY TRANSACTIONS
  displayTransaction(login.transactions)
  // SUMMARY
  calcSummary(login.transactions)
    

  transferBtn.addEventListener('click', function(e){
    e.preventDefault();
      let transferTo = accounts.find(function(acct){
      return acct.username === transferInputUsername.value
      })
      console.log(transferTo)

      transferTo.transactions.push(Number(transferInputAmount.value))
      transferInputAmount.value ='';
      transferInputUsername.value ='';
     })

  loanBtn.addEventListener('click', function(e){
    e.preventDefault();
      console.log(login)
      login.transactions.push(Number(loanAmount.value));
      })

  closeBtn.addEventListener('click', function(e){
    e.preventDefault();
     if(login.username === confirmUserClose.value && login.pin === Number(confirmPinClose.value)){
      const disableIndex = accounts.indexOf(login)
      console.log(disableIndex);
      accounts.splice(disableIndex,1);
      // console.log(accounts);
      visual.classList.remove('visual');
      userInput.value = '';
      userPin.value = '';
      welcomeGreetings.textContent = 'Sign up to get started'
     }
     else(
      console.log('NOT YOUR ACCOUNT')
     )
    })  
})

