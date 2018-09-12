
// CaculatorPrice();
var kt = 0;
var ent; // Global var is declared here so we can access in both functions
    // This shows the pop up window next to the calling element
    function show_text(t, dname) {
        var xp, yp, op
        xp = dname.offsetLeft; // Element's offset x in pixels
        yp = dname.offsetTop; // Element's offset y in pixels
        // Now loop through all parent containers, adding offsets as we do so
        while (dname.offsetParent) {
            op = dname.offsetParent; // Get container parent
            xp = xp + op.offsetLeft; // Add this element's offset x in pixels
            yp = yp + op.offsetTop;     // Add this element's offset y in pixels
            dname = dname.offsetParent; // Update current container
        }
        var newdiv = document.createElement('div');
        newdiv.setAttribute('id', "ent");
        document.body.appendChild(newdiv);
        ent = document.getElementById("ent")    // Get the main element
        if (ent) {
            // Change these to customise your popup window
            ent.style.color = "#000000";
            ent.style.padding = "2px 3px 2px 3px";
            ent.style.background = "#eee";
            ent.style.border = "1px solid #0066cb";
            // Don't, however, change these
            ent.style.position = 'absolute';
            ent.style.left = (xp + 10) + "px";
            ent.style.top = (yp + 25) + "px";
            ent.innerHTML = t;
            ent.style.display = "block";
        }
    }
    
    function clear_text(dname) {
        ent = document.getElementById("ent");
        if (ent) {
            document.body.removeChild(ent);
        }
    }

function messageFunction()
{
        alert("Bạn cần đăng nhập trước khi đặt tour");
}

function CheckMobile() {
    var mobilephone = $("#mobilephone").val();
    $("#mobile0").val(mobilephone);
}
function funCheckInt() {
    //check input nhapvao o nguoi lon
    $("#adult").change(function () {
        if (this.value < 1)
        {
            alert('Dữ liệu nhập vào không hợp lệ');
            this.focus();
            this.value = 1;
            this.select();
            return;
        }
        else {
           
            callTotal(this);
        }            
    });    
    $("#children").change(function () {
        $("#list-form").html("");
        callTotal(this);
    });
    $("#small_children").change(function () {
        $("#list-form").html("");
        callTotal(this);
    });
}

function callTotal(_this)
{

    numNguoiLon = parseInt($("#adult").val());
    numTreEm = parseInt($("#children").val());
    numTreNho = parseInt($("#small_children").val());
    _tour_id = parseInt($("#idTour").val());
    _LM = parseInt('0');
    _TO = parseInt('0');
    slot_agian = parseInt($("#SlotAgain").val());

    total = numNguoiLon + numTreEm + numTreNho;

    if (total > slot_agian) {
        alert('Số chỗ còn nhận cho tour này là ' + slot_agian + '. Quý khách cần chọn lại số lượng khách');
        $("#adult").val("1");
        $("#children").val("0");
        $("#small_children").val("0");

        total = 1;
        numNguoiLon = 1;
        numTreEm = 0;
        numTreNho = 0;
    }

    if (total > 0 && slot_agian != 0) {

        $("#guests").val(total);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        // Call Ajax
        $.ajax({
            url: "/showListKH",
            type: "POST",
            dataType: "json",
            data: { 
                Total: total, 
                adult: numNguoiLon, 
                children: numTreEm, 
                small_children: numTreNho, 
                tour_id: _tour_id , 
                LM : _LM ,
                TO : _TO,
                check: kt
            },
            success: function (response){
                console.log('ok');
                console.log(response)
                console.log(total)
                console.log(numNguoiLon)
                console.log(numTreEm)
                console.log(numTreNho)
                $("#list-form").empty();
                // Hiển thị kết quả tìm kiếm
                $("#list-form").append(response.html);
            },
            error: function (error){
                console.log('that bai');
            }   
        });
    }
    else
    {                
        alert('Dữ liệu nhập vào không hợp lệ');
        _this.focus();
        _this.value = 0;
        _this.select();

        $("#guests").val(1);

        // Call Ajax

        $.ajax({
            url: "/showListKH",
            data: { 
                Total: 0, 
                adult: 0, 
                children: 0, 
                small_children: 0, 
                tour_id: _tour_id, 
                LM : _LM , 
                TO : _TO 
            },
            success: function (response) {
                console.log('ok');
                // Hiển thị kết quả tìm kiếm
                $("#list").append(response);
            }
        });
        kt = 0;
        return false;
    }
   // CaculatorPrice();
   kt = 0;
   return true;
}

// function LoadChuongTrinhTour(page_id) {
//     // Tương tác với server
//     $.ajax({
//         url: "/Tour/_LoadTourProgram",
//         data: {page_id : page_id},
//         success: function (result)
//         {
//             $("#GetDetailTravelImage").html(result);
//         }
//     });
// }

// $('a.email-window').click(function () {

//     //Getting the variable's value from a link
//     var loginBox = $(this).attr('href');

//     //Fade in the Popup
//     $(loginBox).fadeIn(300);

//     //Set the center alignment padding + border see css style
//     var popMargTop = ($(loginBox).height() + 24) / 2;
//     var popMargLeft = ($(loginBox).width() + 24) / 2;

//     $(loginBox).css({
//         'margin-top': -popMargTop,
//         'margin-left': -popMargLeft
//     });

//     // Add the mask to body
//     $('body').append('<div id="mask"></div>');
//     $('#mask').fadeIn(300);

//     return false;
// });

// $('a.close').click(function ()
// {
//     CloseDialog();
// });

// function CloseDialog()
// {
//     $('#mask , .email-popup').fadeOut(300, function () {
//         $('#mask').remove();
//     });
//     return false;
// }

// function CheckDieuKhoan()
// {
//     //if ($('#chkDieuKhoan').is(':checked')) {
//     if(document.getElementById("chkDieuKhoan").checked){
//         var end_date = new Date('2018', parseInt('10') - 1, '2', '12', '45', '0');
//         //var guests = $("#guests").val();
//         var guests = document.getElementById("guests").value;

//         var icheck = 0;//Kiểm tra số lượng khách trên 18 tuổi

//         //Kiem tra bat buoc khi booking phải là người lớn trên 18 tuổi
//         for(var i = 0; i < guests; i++)
//         {
//             //var personkind = $("#personkind" + i).val();
//             var personkind = document.getElementById("personkind" + i).value;
//             if(personkind == 0)
//             {
//                 //var ldob = $("#dateofbirth" + i).val().split("/");
//                 var ldob = document.getElementById("dateofbirth" + i).value.split("/");
//                 var dobNew = new Date(parseInt(ldob[2]) + 18 + "-" + ldob[1] + "-" + ldob[0]);//Them 18 nam so với chọn ngày sinh

//                 if (dobNew > end_date) {
//                     icheck = icheck + 1;//Khách chưa đủ 18 tuổi
//                 }
//                 else
//                 {
//                     icheck = icheck - 5;
//                 }
//             }
//         }

//         if(icheck > 0)
//         {
//             alert('Booking phải có ít nhất 1 khách trên 18 tuổi');
//             return false;
//         }
//         else
//         {
//             return true;
//         }
//     } else {
//         alert('Quý khách cần chọn Điều khoản đăng ký online');
//         return false;
//     }
// }

// value = $('.chkListCustomer:checked').val();
// LoadInfoCustomer(value);

// $('.chkListCustomer').click('change', function () {
//     value = $('.chkListCustomer:checked').val();
//     LoadInfoCustomer(value);
// });
// function LoadInfoCustomer(value)
// {
//     if(value == 1)
//     {
//         $("#DanhSachKhach").show();
//         $("#divTongTien").hide();
//         $("#ThongTinKhach").hide();
//     }
//     else
//     {
//         $("#DanhSachKhach").hide();
//         $("#divTongTien").show();
//         $("#ThongTinKhach").show();
//     }
// }

// function CaculatorPrice() {
//     var CurrencyName = 'đ';
//     var Rate = '1';

//     var adult = $('#adult').val();
//     var children = $('#children').val();
//     var small_children = $('#small_children').val();

//     var adult_price = parseFloat('74990000');//Nguoi lon
//     var child_price = parseFloat('56242500');//TreEm
//     var child_price5 = parseFloat('22497000');//TreNho

//     var totalPrice = (adult * adult_price) + (children * child_price) + (small_children * child_price5);

//     $("#spanTotalPriceBK").text(formatnumber((totalPrice / Rate).toFixed(0)) + ' ' + CurrencyName);
// }

