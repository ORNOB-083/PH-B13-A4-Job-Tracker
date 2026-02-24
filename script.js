console.log('Js Connected')
let interviewCardList = [];
let rejectedCardList = [];
let currentStatus = 'all';

let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

const allFilterBtn = document.getElementById('btn-all');
const interviewFilterBtn = document.getElementById('btn-interview');
const rejectedFilterBtn = document.getElementById('btn-rejected');

const allCardSection = document.getElementById('available-job');
const mainContainer = document.querySelector('body');


function calculateCount() {
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewCardList.length;
    rejectedCount.innerText = rejectedCardList.length;
}

calculateCount();

function toggleStyle(id) {
    allFilterBtn.classList.add('bg-white', 'text-black/60');
    interviewFilterBtn.classList.add('bg-white', 'text-black/60');
    rejectedFilterBtn.classList.add('bg-white', 'text-black/60');

    allFilterBtn.classList.remove('bg-blue-600', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-600', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white');

    const selected = document.getElementById(id);

    currentStatus = id;

    selected.classList.remove('bg-white', 'text-black/60');
    selected.classList.add('bg-blue-600', 'text-white');
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.company').innerText
        const position = parenNode.querySelector('.position').innerText
        const salary = parenNode.querySelector('.salary').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'INTERVIEW'

        const cardInfo = {
            companyName,
            position,
            salary,
            status: 'INTERVIEW',
            notes
        }

        const companyExist = interviewCardList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            interviewCardList.push(cardInfo)
        }

        rejectedCardList = rejectedCardList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == 'btn-rejected') {
            renderStruggling()
        }
        calculateCount()
    }
    else if (event.target.classList.contains('btn-rejected')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.company').innerText
        const position = parenNode.querySelector('.position').innerText
        const salary = parenNode.querySelector('.salary').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            companyName,
            position,
            salary,
            status: 'REJECTED',
            notes
        }

        const companyExist = rejectedCardList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            rejectedCardList.push(cardInfo)
        }

        interviewCardList = interviewCardList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == 'btn-rejected') {
            renderStruggling()
        }
        calculateCount()
    }
})


