$(function () {
    var $activeColumn; //przechowuje informację o kolumnie, do której są dodawane nowe karty
    
    /**
     Generuje losowy ciąg 10 znaków.
    */
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        var i = 0;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    /**
     Funkcja konstruująca kolumny o podanej nazwie.
     @param name - nazwa nowej kolumny
    */
    function Column(name) {
        var self = this; 

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column col-md-3 relative'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete btn button-delete absolute btn-sm').html('&times;'),
                $columnAddCard = $('<button>').addClass('add-card btn button-add btn-sm').attr('data-toggle', 'modal').attr('data-target', '#addCardModal').text('Dodaj kartę');    	
            
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                $activeColumn = self;
            });
            
            $column.append($columnTitle).append($columnDelete).append($columnCardList).append($columnAddCard);
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    
    /**
     Funkcja konstruująca kartę o podanym opisie.
     @param description - opis nowej kolumny
    */
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); 

        function createCard() {
            var $card = $('<li>').addClass('card relative'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete btn button-delete absolute btn-sm').html('&times;');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete).append($cardDescription);
            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            opacity: 0.5,
            cursor: "move"
        }).disableSelection();
    }

    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    $('#addColumnModalBtn').click(function(){
        var name = $('#nameColumn').val();
        var column = new Column(name);
        board.addColumn(column);
        $('#addColumnModal').modal('hide');
    });    
    $('#addColumnModal').on("shown.bs.modal", function () {
        $('#nameColumn').val("").focus();
    });
    $('#addColumnModal').keypress(function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            var name = $('#nameColumn').val();
            var column = new Column(name);
            board.addColumn(column);
            $('#addColumnModal').modal('hide');    
        }
    });

    $('#addCardModalBtn').click(function(){
        var description = $('#descriptionCard').val(),
            card = new Card(description);
        $activeColumn.addCard(card);
        $('#addCardModal').modal('hide');
        $('.card').dotdotdot();
    });    
    $('#addCardModal').on("shown.bs.modal", function () {
        $('#descriptionCard').val("").focus();
    });
    $('#addCardModal').keypress(function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            var description = $('#descriptionCard').val(),
                card = new Card(description);
            $activeColumn.addCard(card);
            $('#addCardModal').modal('hide');
        }
    });

    
});

