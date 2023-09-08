const loadPhone = async (searchText='phone', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones)
    if(phones?.length > 0){
        // console.log(phones);
        displayPhones(phones, isShowAll);
    }else{
        const phoneContainer = document.getElementById('phone-container');
        // clear phone container cards before adding new cards
        phoneContainer.innerHTML = '<h1 class="text-black text-6xl text-center col-span-3">No data available! Please try again!</h1>';
        
        toggleLoadingSpinner(false);
        const showAllContainer = document.getElementById('show-all-container')
        showAllContainer.classList.add('hidden');
    }
}
const isEmpty = data =>{
    for(const prop in data){
        console.log("this is property "+prop);
        if(Object.hasOwn(data, prop)){
            return false;
        }else{
            return true;
        }
    }
}
loadPhone();
function displayPhones(phones, isShowAll){
    const phoneContainer = document.getElementById('phone-container');
    // Clear container before search 
    phoneContainer.innerHTML = '';

     // display show all button if there are more than 12 phones
     const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only 12 phones
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone =>{
        // 1 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 2: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        //3 append child
        phoneContainer.appendChild(phoneCard);
    })
    // hide spinner
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}
function handleShowAll(){
    handleSearch(true);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Each phone details display
const handleShowDetail = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `

    // show the modal
    show_details_modal.showModal();
}