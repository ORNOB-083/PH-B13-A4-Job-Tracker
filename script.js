// console.log('Js Connected')
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
const interviewCardSection = document.getElementById('interview-job');

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

    if (id === 'btn-all') {
        allCardSection.classList.remove('hidden');
        interviewCardSection.classList.add('hidden');

    } else if (id === 'btn-interview') {
        allCardSection.classList.add('hidden');
        interviewCardSection.classList.remove('hidden');
        interviewData();
    } else if (id === 'btn-rejected') {
        allCardSection.classList.add('hidden');
        interviewCardSection.classList.remove('hidden');
        rejectedData();
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
        const card = event.target.closest('.p-6');
        const companyName = card.querySelector('.company').innerText;

        interviewCardList = interviewCardList.filter(item => item.companyName !== companyName);
        rejectedCardList = rejectedCardList.filter(item => item.companyName !== companyName);

        const allCards = allCardSection.querySelectorAll('.p-6');
        allCards.forEach(item => {
            if (item.querySelector('.company').innerText === companyName) {
                item.parentElement.remove();
            }
        });

        if (currentStatus === 'btn-interview') {
            interviewData();
        } else if (currentStatus === 'btn-rejected') {
            rejectedData();
        }
        calculateCount();
    }
    else if (event.target.classList.contains('btn-interview')) {
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
            rejectedData();
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

        if (currentStatus == 'btn-interview') {
            interviewData();
        }
        calculateCount()
    }
})


function interviewData() {
    interviewCardSection.innerHTML = ''

    for (let interview of interviewCardList) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div class="p-6 bg-white rounded-xl my-6 gap-6">
                <div class="flex justify-between">
                    <div>
                        <h3 class="company text-2xl font-normal">${interview.companyName}</h3>
                        <p class="position text-xl font-normal text-[#64748B]">${interview.position}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <button
                            class="delete-btn flex items-center justify-center w-10 h-10 bg-white text-gray-500 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-100">
                            <i class="fa-regular fa-trash-can text-sm"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <p class="salary text-xl font-extralight text-slate-500 py-3">${interview.salary}</p>
                </div>
                <div class="py-3">
                    <button class="status w-32 btn bg-[#EEF4FF] text-[#002C5C]">${interview.status}</button>
                </div>
                <div>
                    <p class="notes font-normal text-[#323B49]">${interview.notes}</p>
                </div>
                <div class="py-3 flex gap-5">
                    <button class="btn btn-interview border-green-600 text-green-600 bg-white">INTERVIEW</button>
                    <button class="btn btn-rejected border-red-600 text-red-600 bg-white">REJECTED</button>
                </div>
            </div>
        `
        interviewCardSection.appendChild(div)
    }
    blankSectionControl()
}

function rejectedData() {
    interviewCardSection.innerHTML = ''
    for (let reject of rejectedCardList) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div class="p-6 bg-white rounded-xl my-6 gap-6">
                <div class="flex justify-between">
                    <div>
                        <h3 class="company text-2xl font-normal">${reject.companyName}</h3>
                        <p class="position text-xl font-normal text-[#64748B]">${reject.position}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <button
                            class="delete-btn flex items-center justify-center w-10 h-10 bg-white text-gray-500 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-100">
                            <i class="fa-regular fa-trash-can text-sm"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <p class="salary text-xl font-extralight text-slate-500 py-3">${reject.salary}</p>
                </div>
                <div class="py-3">
                    <button class="status w-32 btn bg-[#EEF4FF] text-[#002C5C]">${reject.status}</button>
                </div>
                <div>
                    <p class="notes font-normal text-[#323B49]">${reject.notes}</p>
                </div>
                <div class="py-3 flex gap-5">
                    <button class="btn btn-interview border-green-600 text-green-600 bg-white">INTERVIEW</button>
                    <button class="btn btn-rejected border-red-600 text-red-600 bg-white">REJECTED</button>
                </div>
            </div>
        `
        interviewCardSection.appendChild(div)
    }
    blankSectionControl()
}

function blankSectionControl() {
    if (currentStatus == 'btn-interview') {
        if (interviewCardList.length == 0) {
            interviewCardSection.innerHTML = `
                <div class="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-50 my-6">
                    <div class="p-3 rounded-2xl mb-2">
                       <img src="./jobs.png" alt="" srcset="">
                    </div>
                    <h3 class="text-3xl font-bold text-[#002C5C]">No jobs available</h3>
                    <p class="text-slate-500 text-center mt-2">Check back soon for new job opportunities</p>
                </div>
            `;
        }
    }
    else if (currentStatus == 'btn-rejected') {
        if (rejectedCardList.length == 0) {
            interviewCardSection.innerHTML = `
                <div class="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-50 my-6">
                    <div class="p-3 rounded-2xl mb-2">
                       <img src="./jobs.png" alt="" srcset="">
                    </div>
                    <h3 class="text-3xl font-bold text-[#002C5C]">No jobs available</h3>
                    <p class="text-slate-500 text-center mt-2">Check back soon for new job opportunities</p>
                </div>
            `;
        }
    }
}