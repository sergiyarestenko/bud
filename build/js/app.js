$(document).ready( function(){
    startListeners();
    selectColor();
    checkInput($('#main-form'));
    clearAlarm();
});



function startListeners() {
    $(document.body).on('click',function (event) {
        var el = event.target;
        if(!$(el).hasClass('target')){
            setTimeout(clearAlarm, 750);
        }else{
            $(event.target).removeClass('alarm-open');
        }
    })
}

function selectColor() {
    $("select").change(function(){
        $(this).addClass('selected');
    });
}







function checkInput(formEl) {
    $(formEl).find('input').on('focusout',function () {
        if($.trim($(this).val()) == ''){
            empty($(this));
        }
    })
}

function clearAlarm() {
    $('.alarm-open').removeClass('alarm-open');
}

$( function() {
    $('form').submit(function() {
        return false;
    });
});


function onSubmit(el) {
    var name = $(el).find('*[name = "name"]'),
        surname= $(el).find('*[name = "surname"]'),
        card= $(el).find('*[name = "card"]'),
        month= $(el).find('*[name = "month"]'),
        year= $(el).find('*[name = "year"]'),
        cvv= $(el).find('*[name = "cvv"]'),
        zip= $(el).find('*[name = "zip"]');



    if($.trim(name.val()) == ''){
        empty(name);
        return false;
    }else if (!(/^[A-Za-zА-Яа-яЁё\`ґєҐЄ´ІіЇї\s]+$/.test(name.val()))){
        incorrect(name);
        return false;

    }

    if($.trim(surname.val()) == ''){
        empty(surname);
        return false;
    }else if (!(/^[A-Za-zА-Яа-яЁё\`ґєҐЄ´ІіЇї\s]+$/.test(surname.val()))){
        incorrect(surname);
        return false;

    }
    if($.trim(card.val()) == ''){
        empty(card);
        return false;
    }if (!(/\d{16}/.test(removeWhitespaces(card.val())))){
        incorrect(card);
        return false;
    }
    if (!$(month).val()){
        empty(month);
        return false;
    }
    if (!$(year).val()){
        empty(year);
        return false;
    }
    if($.trim(cvv.val()) == ''){
        empty(cvv);
        return false;
    }else if (!(/\d{3}/.test(cvv.val()))||(cvv.val().length>4)){
        incorrect(cvv);
        return false;
    }
    if($.trim(zip.val()) == ''){
        empty(zip);
        return false;
    }else if (!(/\d{5}/.test(zip.val()))||(zip.val().length>5)){
        incorrect(zip);
        return false;
    }


showResult(name.val(),surname.val(),card.val(),$(month).val(),$(year).val(),cvv.val(),zip.val());
name.val('');
surname.val('');
card.val('');
cvv.val('');
zip.val('');
$(month).html(' <option value="0" selected disabled>MM</option>\n' +
        '                              <option value="01">01</option>\n' +
        '                              <option value="02">02</option>\n' +
        '                              <option value="03">03</option>\n' +
        '                              <option value="04">04</option>\n' +
        '                              <option value="05">05</option>\n' +
        '                              <option value="06">06</option>\n' +
        '                              <option value="07">07</option>\n' +
        '                              <option value="08">08</option>\n' +
        '                              <option value="09">09</option>\n' +
        '                              <option value="10">10</option>\n' +
        '                              <option value="11">11</option>\n' +
        '                              <option value="12">12</option>')

    $(year).html(' <option value="0" selected disabled>YYYY</option>\n' +
        '                          <option value="2017">2017</option>\n' +
        '                          <option value="2018">2018</option>\n' +
        '                          <option value="2019">2019</option>\n' +
        '                          <option value="2020">2020</option>\n' +
        '                          <option value="2021">2021</option>\n' +
        '                          <option value="2022">2022</option>')
}


function removeWhitespaces(str) {
    var res = str.replace(/\s/g, "");
    return res;
}

function empty(el) {
    $(el).next('.alarm').html("<span>Required field. Can’t be empty</span>");
    $(el).addClass('alarm-open');
}
function incorrect(el) {
    $(el).next('.alarm').html("<span>This field is invalid</span>");
    $(el).addClass('alarm-open');
}

function showResult(name,surname,card,month,year,cvv,zip) {
    var text = '<div id = "result" class = "result">' +
        '<p><b>First Name: </b>'+name+'</p>' +
        '<p><b>Last Name: </b>'+surname+'</p>' +
        '<p><b>Card Number: </b>'+card+'</p>' +
        '<p><b>Exp. Date: </b>'+month+'/'+year+'</p>' +
        '<p><b>CVV/CVC: </b>'+cvv+'</p>' +
        '<p><b>Zip/Postal Code: </b>'+zip+'</p>' +
        '</div>'
    if($('#result')){
        $('#result').remove();
    };
    $('#main-form').after(text);
}