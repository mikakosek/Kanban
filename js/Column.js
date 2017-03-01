    /**
     Funkcja konstruująca kolumny o podanej nazwie.
     @param name - nazwa nowej kolumny
    */
    function Column(id, name) {
        var self = this; 

        this.id = id;
        this.name = name || 'noname';
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column col-md-3 relative').attr('data-id', id),
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
            var self = this;
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'DELETE',
                success: function(response){
                    self.$element.remove();
                }
            });
        }
    };

    $('#addCardModalBtn').click(function(){
        createCard();
    });    
    $('#addCardModal').on("shown.bs.modal", function () {
        $('#descriptionCard').val("").focus();
    });
    $('#addCardModal').keypress(function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            createCard();
        }
    });
    function createCard() {
        var description = $('#descriptionCard').val();
        
        $.ajax({
            url: baseUrl + '/card',
            method: 'POST',
            data: {
                name: description,
                bootcamp_kanban_column_id: $activeColumn.id
            },
            success: function(response) {
                var card = new Card(response.id, description, $activeColumn.id);
                $activeColumn.addCard(card);
                $('.card').dotdotdot();        
            }
        });
        $('#addCardModal').modal('hide');
    }
