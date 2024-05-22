$(document).ready(function () {
    var windowWidth = $(window).width();
    var viewer = null;
    var containerFluidWidth = $('.container-fluid').width();
    var offFormWidth = $('.search-form').width() + 20;
    var containerWidth = $('.container').width();
    var offsetWidth = Math.ceil((containerFluidWidth - containerWidth) / 2);
    var r = $(':root');
    r.css('--offset', offsetWidth + 'px');
    r.css('--var-form-search', offFormWidth + 'px');

    // Hiển thị lại phần tử sau khi tính toán xong
    $('body').css('visibility', 'visible');
    //$('.guide-item').click(function (e) {
    //    e.preventDefault();
    //    $('.guide-item').removeClass('active');
    //    $(this).addClass('active');
    //});

    // $('.intro-video-item-vr').click(function (e) {
    //   e.preventDefault();
    //   let url = $(this).data('url');
    //   show360VR(url);
    // });

    //Like button
    $(".btn-like").click(function () {
        $(this).toggleClass("liked");
    })

    function show360VR(url) {
        const panorama = new PANOLENS.ImagePanorama(url);
        var panoramaContainner = document.getElementById('pando-image');

        // Nếu viewer chưa được khởi tạo, thì tạo mới
        if (!viewer) {
            viewer = new PANOLENS.Viewer({
                container: panoramaContainner,
                autoRotate: true,
                autoRotateSpeed: 0.3,
                controlBar: false,
            });
        }

        // Loại bỏ panorama hiện tại (nếu có)
        if (viewer.panorama) {
            viewer.panorama.dispose();
        }

        // Thêm panorama mới vào viewer
        viewer.add(panorama);
    }

    // show360VR('assets/images/ar360-01.jpg');

    $('.dropdown-toggle-menu-language').click(function () {
        $('.toggle-icon').toggleClass('rotate-180');
    });

    $('.dropdown-toggle-menu-language').on('hidden.bs.dropdown', function () {
        $('.toggle-icon').removeClass('rotate-180');
    });

});


function showChatBox() {
    $("#chatbox").toggle();
}
$(".time_chatbox").click(() => {
    $("#chatbox").hide();
})

$('.input_ask').keypress(function (e) {
    if (e.which == 13) {
        sendAsk();
    }
});

function sendAsk() {
    var content = $(".input_ask").val();
    if (!(content === null || content.trim() === "")) {
        var htmlStr = ` <div class="ask_person">
                        <div class="content_ask">
                            ${content}
                        </div>
                    </div>`;
        pushOnChatBox(htmlStr);

        getResultMessChatBot(content);
    }
    $(".input_ask").val("");
}

function getResultMessChatBot(content) {
    $.ajax({
        url: "/QLNoiDungChatBotArea/QLNoiDungChatBot/GetNoiDungTraLoi",
        type: "POST",
        data: { TypeNoiDung: content },
        success: (rs) => {
            PushAnswerOnChatBox(rs);
        },
        error: null
    });
}

function pushOnChatBox(content) {
    $(".content_chatbox").append(content);
    var height = $('.content_chatbox')[0].scrollHeight;;
    $('.content_chatbox').scrollTop(height);
}

function ClickBoxOptionChatBot(target) {
    var ParentId = $(target).data("parentid");
    var TypeItem = $(target).data("typeitem");
    var TypeNoiDung = $(target).data("typenoidung");
    var Xa = $(target).data("xa");
    var Huyen = $(target).data("huyen");

    pushOnChatBox(` <div class="ask_person">
                        <div class="content_ask">
                            ${$(target).text()}
                        </div>
                    </div>`);

    $.ajax({
        url: "/QLNoiDungChatBotArea/QLNoiDungChatBot/GetClickOptionChatBot",
        type: "POST",
        data: { ParentId: ParentId, TypeNoiDung: TypeNoiDung, TypeItem: TypeItem, Xa: Xa, Huyen: Huyen },
        success: (rs) => {
            PushAnswerOnChatBox(rs);
        },
        error: null
    });
}


function PushAnswerOnChatBox(arr) {
    var anserStr = `<div class="reply_ask">
                                <div class="row">
                                    <div class="col-sm-2">
                                        <img src="/assets/images/chatbox.png" alt="" />
                                    </div>
                                <div class="col-sm-9">
                                <div class="content_reply">
                                    ${arr.MoTa}
                                </div>
                                <div class="option_thaotac">`;

    arr.children.map((x) => {
        anserStr += `<div onclick="ClickBoxOptionChatBot(this)" data-parentId="${x.Id}" data-typeItem="${x.TypeItem}" data-typeNoiDung="${x.TypeContent}" data-xa="${x.MaXa}" data-huyen="${x.MaHuyen}" class="option_select">
                                                ${x.Title}
                               </div>`;
    });

    if (arr.ListDanhSachDoiTuong != null) {
        anserStr += `  <div class="sugges_address">
                                    <span>Gợi ý địa điểm:</span>
                                    <ul>`
        arr.ListDanhSachDoiTuong.map((x) => {
            anserStr += `<li><a href="${x.Item2}">${x.Item1}</a></li>`
        })

        anserStr += `</ul>
                                </div>`
    }


    anserStr += `       </div>
                            </div>
                        </div>
                    </div>`;
    pushOnChatBox(anserStr);
}