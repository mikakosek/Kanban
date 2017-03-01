    /**
     Funkcja konstruująca kartę o podanym opisie.
     @param description - opis nowej kolumny
    */
    function Card(id, description, idColumn) {
        var self = this;

        this.id = id;
        this.idColumn = idColumn;
        this.description = description || 'none';
        this.$element = createCard(); 

        function createCard() {
            var $card = $('<li>').addClass('card relative'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete btn button-delete absolute btn-sm').html('&times;');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete).append($cardDescription);
            
            $card.mouseup(function() {
                self.moveCard();
            });

            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            var self = this;
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'DELETE',
                success: function(){
                    self.$element.remove();
                }
            });
        },
        moveCard: function() {
            var self = this;
            setTimeout(function() {
                if (self.idColumn != self.$element.parents('.column').attr('data-id'))
                {
                    $.ajax({
                        url: baseUrl + '/card/' + self.id,
                        method: 'PUT',
                        data: {
                            name: self.description,
                            bootcamp_kanban_column_id: self.$element.parents('.column').attr('data-id')
                        },
                        success: function(){
                        }
                    });
                }
            }, 0);
        }
    }
