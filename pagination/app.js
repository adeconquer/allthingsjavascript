const list_items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
    'Item 16',
    'Item 17',
    'Item 18',
    'Item 19',
    'Item 20',
    'Item 21',
    'Item 22',
];

const list_element = document.querySelector('#list');
const pagination_element = document.querySelector('#pagination');

let current_page = 1;
let rows = 5;

function displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerText = '';
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end)
    console.log(paginatedItems)
    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];
        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        wrapper.appendChild(item_element);
    }
}

function prevBtn() {
    console.log('getting here');
    if (current_page === 1) {
        displayList(list_items, list_element, rows, current_page);
    } else {
        current_page--
        displayList(list_items, list_element, rows, current_page);
    }
}

function nextBtn(page_count) {
    console.log('maybe not the best code');
    if (current_page === page_count) {
        displayList(list_items, list_element, rows, current_page);
    } else {
        current_page++
        displayList(list_items, list_element, rows, current_page);
    }
}

function paginationButton(page, page_count) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page === page) {
        button.classList.add('active');
    }

    button.addEventListener('click', function() {
        if (button.innerText === '<<') {
            prevBtn();
        } else if (button.innerText === '>>') {
            nextBtn(page_count);
        } else {
            current_page = page
            displayList(list_items, list_element, rows, current_page);
            let current_button = document.querySelector('.pagenumbers button.active');
            current_button.classList.remove('active');
            button.classList.add('active')
        }

    })
    return button;
}

function setupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = '';
    let page_count = Math.ceil(items.length / rows_per_page);
    let prevBtn = paginationButton('<<', page_count);
    wrapper.appendChild(prevBtn);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, page_count);
        wrapper.appendChild(btn);
    }
    let nextBtn = paginationButton('>>', page_count);
    wrapper.appendChild(nextBtn);

}



displayList(list_items, list_element, rows, current_page);
setupPagination(list_items, pagination_element, rows);