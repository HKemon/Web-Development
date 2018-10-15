// Storage

// Item
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: () => {
            return data.items;
        },

        addItem: (name, calories) => {
            let ID = 0;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            }
            calories = parseInt(calories);

            let newItem = new Item(ID, name, calories);

            data.items.push(newItem);

            return newItem;
        },
        getItemById: id => {
            let found = null;

            data.items.forEach(item => {
                if (item.id === id)
                    found = item;
            });
            return found;
        },
        updateItem: (name, calories) => {
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        deleteItem: id => {
            const ids = data.items.map(item => {
                return item.id;
            });

            const index = ids.indexOf(id);

            data.items.splice(index, 1);
        },
        setCurrentItem: (itemToEdit) => {
            data.currentItem = itemToEdit;
        },
        getCurrentItem:
            () => {
                return data.currentItem;
            },
        getTotalCalories:
            () => {
                let total = 0;

                data.items.forEach(function (item) {
                    total += item.calories;
                });

                data.totalCalories = total;

                return data.totalCalories;
            },

        clearAllItems: () => {
            data.items = [];
        },

        logData:
            () => {
                return data;
            }
    }
})();

// UI
const UICtrl = (() => {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        clearBtn: '.clear-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    };

    return {
        populateItemList: items => {
            let html = '';
            items.forEach(function (item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                       <strong>${item.name}</strong>
                       <em>${item.calories} Calories</em>
                       <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                       </a>
                </li>`;
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: item => {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
                       <strong>${item.name}</strong>
                       <em>${item.calories} Calories</em>
                       <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                       </a>`;
            document.querySelector(UISelectors.itemList)
                .insertAdjacentElement('beforeEnd', li);
        },
        updateListItem: item => {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}</strong>
                        <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>`;
                }
            });
        },
        deleteListItem: id => {
            const itemID = `#item-${id}`;
            document.querySelector(itemID).remove();
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        removeItems: () => {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);
            listItems.forEach(item => {
                item.remove();
            });
        },
        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: totalCalories => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: () => {
            return UISelectors;
        }
    }
})();

// App
const App = (function (ItemCtrl, UICtrl) {
    // Load Event Listener
    const loadEventListener = function () {
        const UISelectors = UICtrl.getSelectors();

        // Disable submit on enter
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    };

    const updateCalories = () => {
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearInput();
    };

    const itemAddSubmit = e => {
        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);

            updateCalories();
        } else {
            alert("All Inputs are necessary");
        }
        e.preventDefault();
    };

    const itemEditClick = e => {
        const ev = e.target;
        if (ev.classList.contains('edit-item')) {
            const listId = ev.parentNode.parentNode.id;

            const listIdArr = listId.split('-');

            const id = parseInt(listIdArr[1]);

            const itemToEdit = ItemCtrl.getItemById(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    const itemUpdateSubmit = e => {
        const input = UICtrl.getItemInput();

        const updateItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updateItem);

        updateCalories();
        UICtrl.clearEditState();

        e.preventDefault();
    };

    const itemDeleteSubmit = e => {
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);

        updateCalories();

        e.preventDefault();
    };

    const clearAllItemsClick = () => {
        ItemCtrl.clearAllItems();

        updateCalories();

        UICtrl.removeItems();

        UICtrl.hideList();
    };

    return {
        init: () => {
            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();

            if (items.length === 0)
                UICtrl.hideList();
            else UICtrl.populateItemList(items);

            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            loadEventListener();
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();