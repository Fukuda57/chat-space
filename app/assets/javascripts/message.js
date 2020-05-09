$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-message">
          <div class="chat-message__user">
            <p class="chat-message__user-name">
              ${message.user_name}
            </p>
            <p class="chat-message__user-time">
              ${message.created_at}
            </p>
          </div>
          <p class="chat-message__message">
            ${message.body}
          </p>
          <img src="${message.image}">
        </div>`
      return html;
    } else {
      var html =
        `<div class="chat-message">
          <div class="chat-message__user">
            <p class="chat-message__user-name">
              ${message.user_name}
            </p>
            <p class="chat-message__user-time">
              ${message.created_at}
            </p>
          </div>
          <p class="chat-message__message">
            ${message.body}
          </p>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);  
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});