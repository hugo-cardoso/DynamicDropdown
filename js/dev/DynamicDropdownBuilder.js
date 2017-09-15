var DynamicDropdownBuilder = function(elem) {

    this.elem = elem;
    this.view = new DynamicDropdownView();
    this.init();
}

DynamicDropdownBuilder.prototype = {

    init: function() {

        this.build();

        var toggleList = this.toggleList.bind(this);
        var selectItem = this.selectItem.bind(this);
        var searchItem = this.searchItem.bind(this);
        var openList   = this.openList.bind(this);

        this.view.boxStatus
            .addEventListener("click", toggleList);
            
        this.view.boxItems
            .addEventListener("click", selectItem);

        this.view.searchField
            .addEventListener("input", searchItem);

        this.view.searchField
            .addEventListener("focus", openList);
    },

    build: function() {

       this.view.generateLayout(this.elem);
    },

    openList: function() {
    
        this.view.boxStatus.setAttribute("data-status","on");
        this.view.boxItems.style.display = "block";
    },

    closeList: function() {

        this.view.boxStatus.setAttribute("data-status","off");
        this.view.boxItems.style.display = "none";
    },

    toggleList: function() {

        var boxStatus = this.view.boxStatus.getAttribute("data-status");

        boxStatus === "off" ? this.openList() : this.closeList();
    },

    selectItem: function(event) {

        var elem = event.target;

        if ( elem.nodeName !== "LI" ) return;

        var itemValue = elem.getAttribute("data-id"),
            itemText  = elem.innerText;
        
            this.view.searchFieldHidden.value = itemValue;

            this.view.searchField.value = itemText;

        this.closeList();
    },

    searchItem: function() {

        this.openList();

        var searchText = this.view.searchField.value,
            items      = this.view.boxItems.querySelectorAll("li"),
            regexp     = new RegExp(searchText, 'i');

        var strictSearch = {
            status: false,
            value : ''
        };

        items.forEach(function(listitem){
        
            var itemText  = listitem.innerText,
                itemValue = listitem.getAttribute("data-id");

            searchText === itemText ? strictSearch = {status: true, value: itemValue} : '';

            regexp.test(itemText) ? listitem.style.display = "block" : listitem.style.display = "none";
        });

        this.bindValues(strictSearch);
    },

    bindValues: function(strictSearch) {

        strictSearch.status === false
            ? this.view.searchFieldHidden.value = ""
            : this.view.searchFieldHidden.value = strictSearch.value;
    }
}