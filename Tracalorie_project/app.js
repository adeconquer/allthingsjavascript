// Storage Controller
const StorageCtrl = (function() {
    // Public methods
    return {
        storeItem: function(item) {
            let items;

            // Check if any items in localstorage

            if (localStorage.getItem('items') === null) {
                items = [];
                items.push(item);
                // Set localstorage
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem('items'));

                //Push the new item
                items.push(item);

                //reset lS
                localStorage.setItem('items', JSON.stringify(items))
            }

        },
        getItemsFromStorage: function() {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (updatedItem.id == item.id) {
                    items.splice(index, 1, updatedItem);
                }
            })

            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if (id == item.id) {
                    items.splice(index, 1);
                }
            })

            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsfromStorage: function() {
            localStorage.removeItem('items')
        }
    }
})();

//Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories
    }

    // Data Structure
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public methods 
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }

            // Calories to number
            calories = parseInt(calories);
            // Create newItem
            newItem = new Item(ID, name, calories)
            data.items.push(newItem)

            return newItem
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },
        deleteItem: function(id) {
            // Get ids
            const ids = data.items.map((item) => {
                return item.id
            });
            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        getItemById: function(id) {
            let found = null;

            data.items.forEach((item) => {
                if (item.id === id) {
                    found = item
                }
            })
            return found;
        },
        setCurrentItem: function(item) {
            data.currentItem = item
        },
        getCurrentItem: function() {
            return data.currentItem
        },
        getTotalCalories: function() {
            let total = 0;

            data.items.forEach((item) => {
                total += item.calories;
            });

            // Set total cal in data structure 
            data.totalCalories = total;

            return data.totalCalories
        },
        logData: function() {
            return data
        }
    }
})();


//UI Controller
const UICtrl = (function() {

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        clearBtn: '.clear-btn'

    }

    //Public methods
    return {
        populateItemList: function(items) {
            let html = '';
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });

            //Insert list item
            document.querySelector(UISelectors.itemList).innerHTML = html

        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block'
                // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`

            // Insert item
            document.querySelector(UISelectors.itemList).
            insertAdjacentElement('beforeend', li)

        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node List into Array
            listItems = Array.from(listItems);

            listItems.forEach((listItem) => {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })

        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();

        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState()
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach((item) => {
                item.remove();
            })
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';

        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();

//App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // load event listeners
    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(e) {
            if (e.keycode === 13 || e.which === 13) {
                e.preventDefault();
                return false;

            }
        })

        // Edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update icon click
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Back icon click
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Delete icon click
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Clear Btn click
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie inout
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalcalories = ItemCtrl.getTotalCalories()

            // Add total calories to UI
            UICtrl.showTotalCalories(totalcalories);

            // store in local storage
            StorageCtrl.storeItem(newItem);

            //Clear the fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            //break into an array
            const listIdArr = listId.split('-');
            // get the id
            const id = parseInt(listIdArr[1]);

            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e) {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalcalories = ItemCtrl.getTotalCalories()

        // Add total calories to UI
        UICtrl.showTotalCalories(totalcalories);

        UICtrl.clearEditState();

        // Update LS
        StorageCtrl.updateItemStorage(updatedItem)

        e.preventDefault();
    }

    // Delete button event
    const itemDeleteSubmit = function(e) {
            // Get id from current item
            const currentItem = ItemCtrl.getCurrentItem();

            // Delete from data structure
            ItemCtrl.deleteItem(currentItem.id);

            // Delete form UI
            UICtrl.deleteListItem(currentItem.id);

            // Get total calories
            const totalcalories = ItemCtrl.getTotalCalories()

            // Add total calories to UI
            UICtrl.showTotalCalories(totalcalories);

            // Delete from LS
            StorageCtrl.deleteItemFromStorage(currentItem.id)

            UICtrl.clearEditState();

            e.preventDefault()
        }
        // Clear items event
    const clearAllItemsClick = function() {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalcalories = ItemCtrl.getTotalCalories()

        // Add total calories to UI
        UICtrl.showTotalCalories(totalcalories);

        // Remove from UI
        UICtrl.removeItems();

        // Remove from LS
        StorageCtrl.clearItemsfromStorage();

        // Hide UL
        UICtrl.hideList()
    }

    // Public methods
    return {
        init: function() {
            // Clear edit state/ set edit state
            UICtrl.clearEditState()

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if (items.length === 0) {
                UICtrl.hideList()
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalcalories = ItemCtrl.getTotalCalories()

            // Add total calories to UI
            UICtrl.showTotalCalories(totalcalories);

            // Load Eventlisteners
            loadEventListeners()

        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

//initialize App
App.init()